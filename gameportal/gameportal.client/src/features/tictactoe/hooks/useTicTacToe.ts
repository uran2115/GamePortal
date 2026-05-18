import { useEffect, useState } from "react";

import type {
    WinnerLine,
} from "../types/ticTacToeTypes";

export type CellValue =
    | "X"
    | "O"
    | null;

interface GameState {
    board: CellValue[];
    currentPlayer: "X" | "O";

    winner:
    | "X"
    | "O"
    | "draw"
    | null;

    winningLine: WinnerLine;
}

interface GameConfig {
    difficulty: string;
    playerSymbol: "X" | "O";
    aiSymbol: "X" | "O";
}

const WINNING_LINES: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

function calculateWinner(
    board: CellValue[]
): {
    winner:
    | "X"
    | "O"
    | "draw"
    | null;

    winningLine: WinnerLine;
} {
    for (const line of WINNING_LINES) {
        const [a, b, c] = line;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return {
                winner: board[a],
                winningLine: line,
            };
        }
    }

    if (board.every((cell) => cell)) {
        return {
            winner: "draw",
            winningLine: null,
        };
    }

    return {
        winner: null,
        winningLine: null,
    };
}

function getAvailableMoves(
    board: CellValue[]
) {
    return board
        .map((cell, index) =>
            cell === null ? index : null
        )
        .filter(
            (cell): cell is number =>
                cell !== null
        );
}

function getRandomMove(
    board: CellValue[]
) {
    const available =
        getAvailableMoves(board);

    return available[
        Math.floor(
            Math.random() *
            available.length
        )
    ];
}

function minimax(
    board: CellValue[],
    depth: number,
    isMaximizing: boolean,
    aiSymbol: "X" | "O",
    playerSymbol: "X" | "O"
): number {
    const result =
        calculateWinner(board);

    if (result.winner === aiSymbol)
        return 10 - depth;

    if (
        result.winner ===
        playerSymbol
    ) {
        return depth - 10;
    }

    if (result.winner === "draw")
        return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (const move of getAvailableMoves(
            board
        )) {
            board[move] = aiSymbol;

            const score = minimax(
                board,
                depth + 1,
                false,
                aiSymbol,
                playerSymbol
            );

            board[move] = null;

            bestScore = Math.max(
                score,
                bestScore
            );
        }

        return bestScore;
    }

    let bestScore = Infinity;

    for (const move of getAvailableMoves(
        board
    )) {
        board[move] = playerSymbol;

        const score = minimax(
            board,
            depth + 1,
            true,
            aiSymbol,
            playerSymbol
        );

        board[move] = null;

        bestScore = Math.min(
            score,
            bestScore
        );
    }

    return bestScore;
}

function getBestMove(
    board: CellValue[],
    aiSymbol: "X" | "O",
    playerSymbol: "X" | "O"
) {
    let bestScore = -Infinity;

    let move = 0;

    for (const index of getAvailableMoves(
        board
    )) {
        board[index] = aiSymbol;

        const score = minimax(
            board,
            0,
            false,
            aiSymbol,
            playerSymbol
        );

        board[index] = null;

        if (score > bestScore) {
            bestScore = score;
            move = index;
        }
    }

    return move;
}

function getAiMove(
    board: CellValue[],
    difficulty: string,
    aiSymbol: "X" | "O",
    playerSymbol: "X" | "O"
) {
    switch (difficulty) {
        case "easy":
            return getRandomMove(board);

        case "medium":
            return Math.random() < 0.5
                ? getRandomMove(board)
                : getBestMove(
                    board,
                    aiSymbol,
                    playerSymbol
                );

        case "impossible":
            return getBestMove(
                board,
                aiSymbol,
                playerSymbol
            );

        default:
            return getRandomMove(board);
    }
}

export function useTicTacToe() {
    const [config, setConfig] =
        useState<GameConfig | null>(
            null
        );

    const [
        showResultModal,
        setShowResultModal,
    ] = useState(false);

    const [isAiThinking, setIsAiThinking] =
        useState(false);

    const [gameState, setGameState] =
        useState<GameState>({
            board: Array(9).fill(null),
            currentPlayer: "X",
            winner: null,
            winningLine: null,
        });

    const startGame = (
        difficulty: string,
        playerSymbol: "X" | "O"
    ) => {
        const aiSymbol: "X" | "O" =
            playerSymbol === "X"
                ? "O"
                : "X";

        setConfig({
            difficulty,
            playerSymbol,
            aiSymbol,
        });

        setShowResultModal(false);

        setGameState({
            board: Array(9).fill(null),
            currentPlayer: "X",
            winner: null,
            winningLine: null,
        });
    };

    const handleCellClick = (
        index: number
    ) => {
        if (!config) return;

        if (
            gameState.board[index] ||
            gameState.winner ||
            isAiThinking
        ) {
            return;
        }

        if (
            gameState.currentPlayer !==
            config.playerSymbol
        ) {
            return;
        }

        const newBoard = [
            ...gameState.board,
        ];

        newBoard[index] =
            config.playerSymbol;

        const result =
            calculateWinner(newBoard);

        setGameState({
            board: newBoard,
            currentPlayer:
                config.aiSymbol,
            winner: result.winner,
            winningLine:
                result.winningLine,
        });

        if (result.winner) {
            setTimeout(() => {
                setShowResultModal(true);
            }, 900);
        }
    };

    const resetGame = () => {
        if (!config) return;

        setShowResultModal(false);

        setGameState({
            board: Array(9).fill(null),
            currentPlayer: "X",
            winner: null,
            winningLine: null,
        });
    };

    useEffect(() => {
        if (!config) return;

        if (gameState.winner) return;

        if (
            gameState.currentPlayer !==
            config.aiSymbol
        ) {
            return;
        }

        const timeout = setTimeout(() => {
            setIsAiThinking(true);

            setTimeout(() => {
                const aiMove =
                    getAiMove(
                        [...gameState.board],
                        config.difficulty,
                        config.aiSymbol,
                        config.playerSymbol
                    );

                const newBoard = [
                    ...gameState.board,
                ];

                newBoard[aiMove] =
                    config.aiSymbol;

                const result =
                    calculateWinner(
                        newBoard
                    );

                setGameState({
                    board: newBoard,
                    currentPlayer:
                        config.playerSymbol,
                    winner:
                        result.winner,
                    winningLine:
                        result.winningLine,
                });

                if (result.winner) {
                    setTimeout(() => {
                        setShowResultModal(
                            true
                        );
                    }, 900);
                }

                setIsAiThinking(false);
            }, 400);
        }, 500);

        return () =>
            clearTimeout(timeout);
    }, [gameState, config]);

    return {
        gameState,
        config,
        startGame,
        handleCellClick,
        resetGame,
        isAiThinking,
        showResultModal,
    };
}