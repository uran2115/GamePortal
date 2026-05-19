import type {
    RGBColor,
} from "../types/colorMatchTypes";

export function calculateScore(
    original: RGBColor,
    guess: RGBColor
) {
    const distance = Math.sqrt(
        Math.pow(original.r - guess.r, 2) +
        Math.pow(original.g - guess.g, 2) +
        Math.pow(original.b - guess.b, 2)
    );

    const maxDistance =
        Math.sqrt(255 * 255 * 3);

    const differencePercent =
        distance / maxDistance;

    const score =
        Math.pow(
            1 - differencePercent,
            2
        ) * 10;

    return Number(
        Math.max(0, score).toFixed(2)
    );
}