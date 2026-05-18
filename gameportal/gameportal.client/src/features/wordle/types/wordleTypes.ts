export interface GuessResult {
    letter: string;
    status: string;
}

export interface GuessHistoryItem {
    guess: string;
    results: GuessResult[];
}

export interface AnimatedRow {
    guess: string;
    results: GuessResult[];
}

export interface GameState {
    id: string;
    attempts: number;
    maxAttempts: number;
    status: string;
    revealedWord?: string;
    guessHistory: GuessHistoryItem[];
}