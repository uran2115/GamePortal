import {
    checkWinner,
    getAvailableMoves,
} from "./gameLogic";

import type {
    CellValue,
    Difficulty,
    Player,
} from "../types/ticTacToeTypes";

function randomMove(
    board: CellValue[]
): number {
    const moves =
        getAvailableMoves(board);

    return moves[
        Math.floor(
            Math.random() * moves.length
        )
    ];
}

function minimax(
    board: CellValue[],
    depth: number,
    isMaximizing: boolean,
    aiSymbol: Player,
    playerSymbol: Player
): number {
    const winner =
        checkWinner(board);

    if (winner === aiSymbol)
        return 10 - depth;

    if (winner === playerSymbol)
        return depth - 10;

    if (
        getAvailableMoves(board).length === 0
    ) {
        return 0;
    }

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

function bestMove(
    board: CellValue[],
    aiSymbol: Player,
    playerSymbol: Player
): number {
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

export function getAiMove(
    board: CellValue[],
    difficulty: Difficulty,
    aiSymbol: Player,
    playerSymbol: Player
): number {
    switch (difficulty) {
        case "easy":
            return randomMove(board);

        case "medium":
            return Math.random() < 0.7
                ? bestMove(
                    board,
                    aiSymbol,
                    playerSymbol
                )
                : randomMove(board);

        case "impossible":
            return bestMove(
                board,
                aiSymbol,
                playerSymbol
            );

        default:
            return randomMove(board);
    }
}