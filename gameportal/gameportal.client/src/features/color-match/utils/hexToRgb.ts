import type { RGBColor } from "../types/colorMatchTypes";

export function hexToRgb(
    hex: string
): RGBColor {
    const clean =
        hex.replace("#", "");

    return {
        r: parseInt(
            clean.substring(0, 2),
            16
        ),

        g: parseInt(
            clean.substring(2, 4),
            16
        ),

        b: parseInt(
            clean.substring(4, 6),
            16
        ),
    };
}