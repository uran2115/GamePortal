import {
    useEffect,
    useState,
} from "react";

import type {
    SequencePhase,
} from "../types/sequenceMemoryTypes";

import {
    generateRandomCell,
} from "../utils/generateRandomCell";

const SHOW_DELAY = 600;
const BETWEEN_DELAY = 250;

export function useSequenceMemory() {
    const [phase, setPhase] =
        useState<SequencePhase>("start");

    const [level, setLevel] =
        useState(1);

    const [sequence, setSequence] =
        useState<number[]>([]);

    const [playerIndex, setPlayerIndex] =
        useState(0);

    const [activeCell, setActiveCell] =
        useState<number | null>(null);

    const [clickedCell, setClickedCell] =
        useState<number | null>(null);

    const [successFlash, setSuccessFlash] =
        useState(false);

    const [score, setScore] =
        useState(0);

    const startGame = () => {
        const firstCell =
            generateRandomCell();

        setLevel(1);
        setScore(0);
        setSequence([firstCell]);
        setPlayerIndex(0);
        setActiveCell(null);
        setClickedCell(null);
        setSuccessFlash(false);
        setPhase("showing");
    };

    const backToStart = () => {
        setPhase("start");
        setLevel(1);
        setScore(0);
        setSequence([]);
        setPlayerIndex(0);
        setActiveCell(null);
        setClickedCell(null);
        setSuccessFlash(false);
    };

    const nextLevel = () => {
        const nextCell =
            generateRandomCell();

        setLevel((prev) => prev + 1);
        setScore(level);
        setPlayerIndex(0);
        setClickedCell(null);
        setSuccessFlash(false);
        setSequence((prev) => [
            ...prev,
            nextCell,
        ]);
        setPhase("showing");
    };

    const handleCellClick = (
        cellIndex: number
    ) => {
        if (phase !== "input") return;

        setClickedCell(cellIndex);

        setTimeout(() => {
            setClickedCell(null);
        }, 180);

        const expectedCell =
            sequence[playerIndex];

        if (cellIndex !== expectedCell) {
            setPhase("gameOver");
            return;
        }

        const nextIndex =
            playerIndex + 1;

        if (nextIndex >= sequence.length) {
            setSuccessFlash(true);

            setTimeout(() => {
                nextLevel();
            }, 700);

            return;
        }

        setPlayerIndex(nextIndex);
    };

    useEffect(() => {
        if (phase !== "showing") return;

        let cancelled = false;

        const showSequence = async () => {
            setActiveCell(null);
            setClickedCell(null);
            setSuccessFlash(false);

            await new Promise((resolve) =>
                setTimeout(
                    resolve,
                    BETWEEN_DELAY
                )
            );

            for (const cell of sequence) {
                if (cancelled) return;

                setActiveCell(cell);

                await new Promise((resolve) =>
                    setTimeout(
                        resolve,
                        SHOW_DELAY
                    )
                );

                setActiveCell(null);

                await new Promise((resolve) =>
                    setTimeout(
                        resolve,
                        BETWEEN_DELAY
                    )
                );
            }

            if (!cancelled) {
                setPlayerIndex(0);
                setPhase("input");
            }
        };

        showSequence();

        return () => {
            cancelled = true;
        };
    }, [phase, sequence]);

    return {
        phase,
        level,
        score,
        activeCell,
        clickedCell,
        successFlash,
        startGame,
        backToStart,
        handleCellClick,
    };
}