import type {
    CellValue,
    Player,
} from "../types/ticTacToeTypes";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

export function checkWinner(
    board: CellValue[]
): Player | null {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a];
        }
    }

    return null;
}

export function isDraw(
    board: CellValue[]
): boolean {
    return board.every(
        (cell) => cell !== null
    );
}

export function getAvailableMoves(
    board: CellValue[]
): number[] {
    return board
        .map((cell, index) =>
            cell === null ? index : null
        )
        .filter(
            (index): index is number =>
                index !== null
        );
}