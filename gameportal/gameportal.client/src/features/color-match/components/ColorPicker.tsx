import { useState } from "react";

import type {
    HSLColor,
    RGBColor,
} from "../types/colorMatchTypes";

import { hslToRgb } from "../utils/hslToRgb";
import { rgbToHex } from "../utils/rgbToHex";

interface ColorPickerProps {
    color: RGBColor;
    onChange: (color: RGBColor) => void;
}

interface SliderProps {
    value: number;
    max: number;
    type: keyof HSLColor;
    label: string;
    hsl: HSLColor;
    onSliderChange: (
        e: React.PointerEvent<HTMLDivElement>,
        key: keyof HSLColor,
        max: number
    ) => void;
}

function Slider({
    value,
    max,
    type,
    label,
    hsl,
    onSliderChange,
}: SliderProps) {
    const top = (value / max) * 100;

    const gradient =
        type === "h"
            ? "linear-gradient(to bottom, red, yellow, lime, cyan, blue, magenta, red)"
            : type === "s"
                ? `linear-gradient(to bottom, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`
                : `linear-gradient(to bottom, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 50%), hsl(${hsl.h}, ${hsl.s}%, 100%))`;

    return (
        <div className="flex flex-col items-center gap-3">
            <div
                onPointerDown={(e) =>
                    onSliderChange(e, type, max)
                }
                onPointerMove={(e) => {
                    if (e.buttons === 1) {
                        onSliderChange(e, type, max);
                    }
                }}
                className="
                    relative
                    w-14
                    h-[420px]
                    rounded-full
                    cursor-pointer
                    select-none
                "
                style={{
                    background: gradient,
                }}
            >
                <div
                    className="
                        absolute
                        left-1/2
                        w-7
                        h-7
                        rounded-full
                        bg-white
                        shadow-[0_0_20px_rgba(255,255,255,0.9)]
                        border-2
                        border-white
                    "
                    style={{
                        top: `${top}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            </div>

            <span className="text-sm text-zinc-400 font-bold">
                {label}
            </span>
        </div>
    );
}

function ColorPicker({
    color,
    onChange,
}: ColorPickerProps) {
    const [hsl, setHsl] =
        useState<HSLColor>({
            h: 120,
            s: 70,
            l: 50,
        });

    const updateColor = (
        partial: Partial<HSLColor>
    ) => {
        const next = {
            ...hsl,
            ...partial,
        };

        setHsl(next);
        onChange(hslToRgb(next));
    };

    const handleSliderChange = (
        e: React.PointerEvent<HTMLDivElement>,
        key: keyof HSLColor,
        max: number
    ) => {
        const rect =
            e.currentTarget.getBoundingClientRect();

        const y =
            e.clientY - rect.top;

        const percent =
            y / rect.height;

        const value = Math.round(
            Math.max(
                0,
                Math.min(1, percent)
            ) * max
        );

        updateColor({
            [key]: value,
        });
    };

    const hex = rgbToHex(color);

    return (
        <div
            className="
                bg-zinc-900/80
                border
                border-zinc-800
                rounded-[32px]
                p-8
                shadow-[0_0_80px_rgba(0,0,0,0.5)]
                flex
                gap-8
                items-stretch
                relative
                z-10
            "
        >
            <div className="flex gap-4">
                <Slider
                    value={hsl.h}
                    max={360}
                    type="h"
                    label="H"
                    hsl={hsl}
                    onSliderChange={handleSliderChange}
                />

                <Slider
                    value={hsl.s}
                    max={100}
                    type="s"
                    label="S"
                    hsl={hsl}
                    onSliderChange={handleSliderChange}
                />

                <Slider
                    value={hsl.l}
                    max={100}
                    type="l"
                    label="L"
                    hsl={hsl}
                    onSliderChange={handleSliderChange}
                />
            </div>

            <div
                className="
                    w-[420px]
                    h-[420px]
                    rounded-[24px]
                    border
                    border-white/10
                "
                style={{
                    background: hex,
                }}
            />

            <div className="flex flex-col justify-between min-w-[120px]">
                <p className="font-bold text-zinc-400">
                    Color Match
                </p>

                <div>
                    <p className="text-zinc-400 mb-2">
                        Selected
                    </p>

                    <p className="font-black text-xl">
                        {hex.toUpperCase()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ColorPicker;