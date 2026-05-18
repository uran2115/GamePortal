import type {
    Direction,
    Position,
} from "../types/snakeTypes";

export function moveSnake(
    snake: Position[],
    nextDirection: Direction
) {
    const head = snake[0];

    const newHead = {
        x: head.x,
        y: head.y,
    };

    switch (nextDirection) {
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

    return [newHead, ...snake];
}