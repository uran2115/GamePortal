import type {
    Position,
} from "../types/snakeTypes";

export function generateFood(
    snake: Position[],
    boardSize: number
): Position {
    while (true) {
        const food = {
            x: Math.floor(
                Math.random() * boardSize
            ),

            y: Math.floor(
                Math.random() * boardSize
            ),
        };

        const isOnSnake = snake.some(
            (segment) =>
                segment.x === food.x &&
                segment.y === food.y
        );

        if (!isOnSnake) {
            return food;
        }
    }
}