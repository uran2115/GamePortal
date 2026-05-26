import {
    useEffect,
    useState,
} from "react";

import type {
    NumberMemoryPhase,
} from "../types/numberMemoryTypes";

import {
    generateNumber,
} from "../utils/generateNumber";

const DISPLAY_TIME = 3000;
const AFTER_PROGRESS_END_DELAY = 120;

export function useNumberMemory() {
    const [phase, setPhase] =
        useState<NumberMemoryPhase>("start");

    const [level, setLevel] =
        useState(1);

    const [numberToRemember, setNumberToRemember] =
        useState("");

    const [answer, setAnswer] =
        useState("");

    const [lastAnswer, setLastAnswer] =
        useState("");

    const [lastNumber, setLastNumber] =
        useState("");

    const [score, setScore] =
        useState(0);

    const [progress, setProgress] =
        useState(100);

    const startGame = () => {
        const generated =
            generateNumber(1);

        setLevel(1);
        setScore(0);
        setAnswer("");
        setLastAnswer("");
        setLastNumber("");
        setNumberToRemember(generated);
        setProgress(100);
        setPhase("showing");
    };

    const nextLevel = () => {
        const nextLevelValue =
            level + 1;

        const generated =
            generateNumber(nextLevelValue);

        setLevel(nextLevelValue);
        setAnswer("");
        setLastAnswer("");
        setLastNumber("");
        setNumberToRemember(generated);
        setProgress(100);
        setPhase("showing");
    };

    const submitAnswer = () => {
        if (!answer.trim()) {
            return;
        }

        setLastAnswer(answer);
        setLastNumber(numberToRemember);

        if (answer !== numberToRemember) {
            setPhase("gameOver");
            return;
        }

        setScore(level);
        setPhase("success");
    };

    const backToStart = () => {
        setPhase("start");
        setLevel(1);
        setScore(0);
        setAnswer("");
        setLastAnswer("");
        setLastNumber("");
        setNumberToRemember("");
        setProgress(100);
    };

    useEffect(() => {
        if (phase !== "showing") return;

        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed =
                Date.now() - startTime;

            const nextProgress = Math.max(
                0,
                100 -
                (elapsed / DISPLAY_TIME) *
                100
            );

            setProgress(nextProgress);

            if (elapsed >= DISPLAY_TIME) {
                clearInterval(interval);

                setProgress(0);

                setTimeout(() => {
                    setPhase("input");
                }, AFTER_PROGRESS_END_DELAY);
            }
        }, 20);

        return () =>
            clearInterval(interval);
    }, [phase]);

    return {
        phase,
        level,
        score,

        numberToRemember,
        answer,
        setAnswer,

        lastAnswer,
        lastNumber,

        progress,

        startGame,
        nextLevel,
        submitAnswer,
        backToStart,
    };
}