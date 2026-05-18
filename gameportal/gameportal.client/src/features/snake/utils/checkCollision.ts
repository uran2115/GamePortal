import type {
    Position,
} from "../types/snakeTypes";

export function checkCollision(
    head: Position,
    snake: Position[],
    boardSize: number
) {
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= boardSize ||
        head.y >= boardSize
    ) {
        return true;
    }

    return snake.some(
        (segment) =>
            segment.x === head.x &&
            segment.y === head.y
    );
}