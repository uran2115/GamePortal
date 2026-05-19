export interface RGBColor {
    r: number;
    g: number;
    b: number;
}

export interface HSLColor {
    h: number;
    s: number;
    l: number;
}

export type GamePhase =
    | "setup"
    | "preview"
    | "guess"
    | "roundResult"
    | "finalResult";

export interface RoundResult {
    round: number;
    originalColor: RGBColor;
    guessColor: RGBColor;
    score: number;
}