import type { RGBColor } from "../types/colorMatchTypes";

export function generateRandomColor(): RGBColor {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
    };
}