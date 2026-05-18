export type Player = "X" | "O";

export type CellValue = Player | null;

export type Difficulty =
    | "easy"
    | "medium"
    | "impossible";

export interface GameState {
    board: CellValue[];
    currentPlayer: Player;
    winner: CellValue | "draw" | null;
    winningLine: WinnerLine;
    isGameOver: boolean;
}

export interface GameConfig {
    playerSymbol: Player;
    aiSymbol: Player;
    difficulty: Difficulty;
}

export type WinnerLine = number[] | null;