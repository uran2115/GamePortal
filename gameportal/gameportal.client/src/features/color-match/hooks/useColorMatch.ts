import {
    useEffect,
    useState,
} from "react";

import {
    generateRandomColor,
} from "../utils/generateRandomColor";

import {
    calculateScore,
} from "../utils/colorDistance";

import type {
    GamePhase,
    RGBColor,
    RoundResult,
} from "../types/colorMatchTypes";

const PREVIEW_TIME = 300;
const TOTAL_ROUNDS = 5;

export function useColorMatch() {
    const [phase, setPhase] =
        useState<GamePhase>("setup");

    const [round, setRound] =
        useState(1);

    const [targetColor, setTargetColor] =
        useState<RGBColor>(
            generateRandomColor()
        );

    const [guessColor, setGuessColor] =
        useState<RGBColor>({
            r: 120,
            g: 120,
            b: 120,
        });

    const [
        previewTimeLeft,
        setPreviewTimeLeft,
    ] = useState(PREVIEW_TIME);

    const [
        roundResults,
        setRoundResults,
    ] = useState<RoundResult[]>([]);

    const startGame = () => {
        setRound(1);
        setRoundResults([]);

        setTargetColor(
            generateRandomColor()
        );

        setGuessColor({
            r: 120,
            g: 120,
            b: 120,
        });

        setPreviewTimeLeft(
            PREVIEW_TIME
        );

        setPhase("preview");
    };

    const submitGuess = () => {
        const score =
            calculateScore(
                targetColor,
                guessColor
            );

        setRoundResults((prev) => [
            ...prev,
            {
                round,
                originalColor:
                    targetColor,
                guessColor,
                score,
            },
        ]);

        setPhase("roundResult");
    };

    const nextRound = () => {
        if (round >= TOTAL_ROUNDS) {
            setPhase("finalResult");
            return;
        }

        setRound((prev) => prev + 1);

        setTargetColor(
            generateRandomColor()
        );

        setGuessColor({
            r: 120,
            g: 120,
            b: 120,
        });

        setPreviewTimeLeft(
            PREVIEW_TIME
        );

        setPhase("preview");
    };

    const backToMenu = () => {
        setPhase("setup");
    };

    useEffect(() => {
        if (phase !== "preview")
            return;

        const interval =
            setInterval(() => {
                setPreviewTimeLeft(
                    (prev) => {
                        if (prev <= 1) {
                            clearInterval(
                                interval
                            );

                            setPhase(
                                "guess"
                            );

                            return 0;
                        }

                        return prev - 1;
                    }
                );
            }, 10);

        return () =>
            clearInterval(interval);
    }, [phase]);

    const totalScore =
        roundResults.reduce(
            (sum, result) =>
                sum + result.score,
            0
        );

    const latestResult =
        roundResults[
        roundResults.length - 1
        ];

    return {
        phase,

        round,
        totalRounds:
            TOTAL_ROUNDS,

        targetColor,
        guessColor,
        setGuessColor,

        previewTimeLeft,

        latestResult,
        roundResults,

        totalScore:
            Number(
                totalScore.toFixed(2)
            ),

        startGame,
        submitGuess,
        nextRound,
        backToMenu,
    };
}