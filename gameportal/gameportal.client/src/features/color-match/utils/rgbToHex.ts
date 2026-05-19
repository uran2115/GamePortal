import type { RGBColor } from "../types/colorMatchTypes";

export function rgbToHex({
    r,
    g,
    b,
}: RGBColor) {
    return `#${[
        r,
        g,
        b,
    ]
        .map((value) =>
            value
                .toString(16)
                .padStart(2, "0")
        )
        .join("")}`;
}