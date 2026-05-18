import { useEffect, useState } from "react";

import {
    getGameRequest,
    sendGuessRequest,
    startGameRequest,
    surrenderGameRequest,
} from "../services/wordleApi";

import type {
    AnimatedRow,
    GameState,
} from "../types/wordleTypes";

export function useWordle() {
    const [gameId, setGameId] = useState("");
    const [guess, setGuess] = useState("");

    const [keyStatuses, setKeyStatuses] =
        useState<Record<string, string>>(
            {}
        );

    const [isAnimating, setIsAnimating] =
        useState(false);

    const [toast, setToast] =
        useState("");

    const [animatedRow, setAnimatedRow] =
        useState<AnimatedRow | null>(null);

    const [revealedIndexes, setRevealedIndexes] =
        useState<number[]>([]);

    const [showResultModal, setShowResultModal] =
        useState(false);

    const [gameState, setGameState] =
        useState<GameState | null>(null);

    const startGame = async () => {
        const data =
            await startGameRequest();

        setGameId(data.id);

        setGuess("");

        setToast("");

        setAnimatedRow(null);

        setRevealedIndexes([]);

        setShowResultModal(false);

        setKeyStatuses({});

        const game =
            await getGameRequest(data.id);

        setGameState(game);
    };

    const loadGame = async (
        id: string
    ) => {
        const data =
            await getGameRequest(id);

        setGameState(data);

        return data;
    };

    const sendGuess = async () => {
        if (guess.length !== 5)
            return;

        const data =
            await sendGuessRequest(
                gameId,
                guess
            );

        if (!data.success) {
            setToast(data.error);

            setTimeout(() => {
                setToast("");
            }, 2000);

            return;
        }

        const updatedStatuses = {
            ...keyStatuses,
        };

        for (const result of data.results) {
            const current =
                updatedStatuses[
                result.letter
                ];

            if (
                result.status ===
                "correct"
            ) {
                updatedStatuses[
                    result.letter
                ] = "correct";

                continue;
            }

            if (
                result.status ===
                "present" &&
                current !== "correct"
            ) {
                updatedStatuses[
                    result.letter
                ] = "present";

                continue;
            }

            if (!current) {
                updatedStatuses[
                    result.letter
                ] = "absent";
            }
        }

        setIsAnimating(true);

        setAnimatedRow({
            guess,
            results: data.results,
        });

        setRevealedIndexes([]);

        setGuess("");

        for (let i = 0; i < 5; i++) {
            await new Promise(
                (resolve) =>
                    setTimeout(
                        resolve,
                        450
                    )
            );

            setRevealedIndexes(
                (prev) => [
                    ...prev,
                    i,
                ]
            );
        }

        await new Promise((resolve) =>
            setTimeout(resolve, 350)
        );

        setKeyStatuses(updatedStatuses);

        const updatedGame =
            await loadGame(gameId);

        setAnimatedRow(null);

        setIsAnimating(false);

        if (
            updatedGame.status ===
            "Won" ||
            updatedGame.status ===
            "Lost"
        ) {
            setShowResultModal(true);
        }
    };

    const handleKey = async (
        key: string
    ) => {
        if (
            gameState?.status !==
            "InProgress" ||
            isAnimating
        )
            return;

        if (key === "ENTER") {
            await sendGuess();

            return;
        }

        if (key === "BACKSPACE") {
            setGuess((prev) =>
                prev.slice(0, -1)
            );

            return;
        }

        if (
            /^[a-ząćęłńóśźż]$/i.test(
                key
            )
        ) {
            if (guess.length < 5) {
                setGuess(
                    (prev) =>
                        prev +
                        key.toLowerCase()
                );
            }
        }
    };

    const surrenderGame = async () => {
        await surrenderGameRequest(gameId);

        const updatedGame =
            await loadGame(gameId);

        setShowResultModal(true);

        setGameState(updatedGame);
    };

    useEffect(() => {
        setTimeout(() => {
            void startGame();
        }, 0);
    }, []);

    useEffect(() => {
        const listener = async (
            e: KeyboardEvent
        ) => {
            if (e.key === "Enter") {
                await handleKey(
                    "ENTER"
                );

                return;
            }

            if (
                e.key === "Backspace"
            ) {
                await handleKey(
                    "BACKSPACE"
                );

                return;
            }

            await handleKey(e.key);
        };

        window.addEventListener(
            "keydown",
            listener
        );

        return () => {
            window.removeEventListener(
                "keydown",
                listener
            );
        };
    }, [
        guess,
        gameState,
        isAnimating,
    ]);

    return {
        gameState,
        guess,
        toast,
        keyStatuses,
        animatedRow,
        revealedIndexes,
        showResultModal,
        handleKey,
        startGame,
        surrenderGame,
    };
}