import {
    useEffect,
    useRef,
    useState,
} from "react";

import type {
    Direction,
    Position,
    SnakeSkin,
} from "../types/snakeTypes";

function getRandomFoodPosition(
    snake: Position[],
    boardSize: number
): Position {
    while (true) {
        const position = {
            x: Math.floor(
                Math.random() *
                boardSize
            ),

            y: Math.floor(
                Math.random() *
                boardSize
            ),
        };

        const isOnSnake =
            snake.some(
                (segment) =>
                    segment.x ===
                    position.x &&
                    segment.y ===
                    position.y
            );

        if (!isOnSnake) {
            return position;
        }
    }
}

export function useSnake() {
    const [boardSize, setBoardSize] =
        useState(14);

    const [
        selectedSkin,
        setSelectedSkin,
    ] = useState<SnakeSkin>(
        "green"
    );

    const [snake, setSnake] =
        useState<Position[]>([
            { x: 7, y: 7 },
            { x: 6, y: 7 },
            { x: 5, y: 7 },
        ]);

    const [food, setFood] =
        useState<Position>({
            x: 10,
            y: 10,
        });

    const [direction, setDirection] =
        useState<Direction>(
            "RIGHT"
        );

    const directionRef =
        useRef<Direction>(
            "RIGHT"
        );

    const [score, setScore] =
        useState(0);

    const [gameOver, setGameOver] =
        useState(false);

    const [
        gameStarted,
        setGameStarted,
    ] = useState(false);

    const startGame = () => {
        setGameStarted(true);

        restartGame();
    };

    const restartGame = () => {
        const center = Math.floor(
            boardSize / 2
        );

        setSnake([
            {
                x: center,
                y: center,
            },

            {
                x: center - 1,
                y: center,
            },

            {
                x: center - 2,
                y: center,
            },
        ]);

        setDirection("RIGHT");

        directionRef.current =
            "RIGHT";

        setFood(
            getRandomFoodPosition(
                [],
                boardSize
            )
        );

        setScore(0);

        setGameOver(false);
    };

    const backToMenu = () => {
        setGameStarted(false);

        setGameOver(false);
    };

    useEffect(() => {
        if (!gameStarted) return;

        restartGame();
    }, [boardSize]);

    // KEYBOARD
    useEffect(() => {
        const handleKeyDown = (
            e: KeyboardEvent
        ) => {
            const current =
                directionRef.current;

            switch (
            e.key.toLowerCase()
            ) {
                case "w":
                case "arrowup":
                    if (
                        current !==
                        "DOWN"
                    ) {
                        directionRef.current =
                            "UP";

                        setDirection(
                            "UP"
                        );
                    }
                    break;

                case "s":
                case "arrowdown":
                    if (
                        current !==
                        "UP"
                    ) {
                        directionRef.current =
                            "DOWN";

                        setDirection(
                            "DOWN"
                        );
                    }
                    break;

                case "a":
                case "arrowleft":
                    if (
                        current !==
                        "RIGHT"
                    ) {
                        directionRef.current =
                            "LEFT";

                        setDirection(
                            "LEFT"
                        );
                    }
                    break;

                case "d":
                case "arrowright":
                    if (
                        current !==
                        "LEFT"
                    ) {
                        directionRef.current =
                            "RIGHT";

                        setDirection(
                            "RIGHT"
                        );
                    }
                    break;
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
    }, []);

    // GAME LOOP
    useEffect(() => {
        if (
            gameOver ||
            !gameStarted
        ) {
            return;
        }

        const interval =
            setInterval(() => {
                setSnake(
                    (
                        currentSnake
                    ) => {
                        const head =
                            currentSnake[0];

                        const newHead = {
                            x: head.x,
                            y: head.y,
                        };

                        switch (
                        directionRef.current
                        ) {
                            case "UP":
                                newHead.y -= 1;
                                break;

                            case "DOWN":
                                newHead.y += 1;
                                break;

                            case "LEFT":
                                newHead.x -= 1;
                                break;

                            case "RIGHT":
                                newHead.x += 1;
                                break;
                        }

                        // WALL COLLISION
                        if (
                            newHead.x <
                            0 ||
                            newHead.y <
                            0 ||
                            newHead.x >=
                            boardSize ||
                            newHead.y >=
                            boardSize
                        ) {
                            setGameOver(
                                true
                            );

                            return currentSnake;
                        }

                        // SELF COLLISION
                        const hitSelf =
                            currentSnake.some(
                                (
                                    segment
                                ) =>
                                    segment.x ===
                                    newHead.x &&
                                    segment.y ===
                                    newHead.y
                            );

                        if (
                            hitSelf
                        ) {
                            setGameOver(
                                true
                            );

                            return currentSnake;
                        }

                        const newSnake =
                            [
                                newHead,
                                ...currentSnake,
                            ];

                        // FOOD
                        if (
                            newHead.x ===
                            food.x &&
                            newHead.y ===
                            food.y
                        ) {
                            setScore(
                                (
                                    prev
                                ) =>
                                    prev +
                                    1
                            );

                            setFood(
                                getRandomFoodPosition(
                                    newSnake,
                                    boardSize
                                )
                            );

                            return newSnake;
                        }

                        newSnake.pop();

                        return newSnake;
                    }
                );
            }, 120);

        return () =>
            clearInterval(
                interval
            );
    }, [
        food,
        gameOver,
        boardSize,
        gameStarted,
    ]);

    return {
        snake,
        food,
        direction,
        score,
        gameOver,

        backToMenu,

        boardSize,
        setBoardSize,

        selectedSkin,
        setSelectedSkin,

        gameStarted,
        startGame,
    };
}