import {
    rgbToHex,
} from "../utils/rgbToHex";

import type {
    RoundResult,
} from "../types/colorMatchTypes";

interface ColorFinalSummaryProps {
    results: RoundResult[];
    totalScore: number;
    maxScore: number;
    onBackToMenu: () => void;
}

function ColorFinalSummary({
    results,
    totalScore,
    maxScore,
    onBackToMenu,
}: ColorFinalSummaryProps) {
    return (
        <div
            className="
                bg-zinc-900/90
                border
                border-zinc-800
                rounded-[32px]
                p-5
                sm:p-8
                w-[95vw]
                max-w-[900px]
                shadow-[0_0_80px_rgba(0,0,0,0.55)]
            "
        >
            <h1 className="text-5xl sm:text-6xl font-black text-center mb-3">
                Summary
            </h1>

            <p className="text-center text-3xl sm:text-4xl font-black text-green-400 mb-8">
                {totalScore.toFixed(2)} / {maxScore}
            </p>

            <div className="flex flex-col gap-4">
                {results.map((result) => {
                    const originalHex =
                        rgbToHex(
                            result.originalColor
                        ).toUpperCase();

                    const guessHex =
                        rgbToHex(
                            result.guessColor
                        ).toUpperCase();

                    return (
                        <div
                            key={result.round}
                            className="
                                bg-zinc-800/45
                                rounded-3xl
                                p-4
                                grid
                                grid-cols-[50px_minmax(190px,1fr)]
                                sm:grid-cols-[70px_300px_1px_130px]
                                gap-4
                                sm:gap-6
                                items-center
                            "
                        >
                            <div className="font-black text-3xl sm:text-4xl">
                                #{result.round}
                            </div>

                            <div
                                className="
                                    grid
                                    grid-cols-2
                                    w-full
                                    h-[96px]
                                    min-w-[190px]
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-white/10
                                "
                            >
                                {/* ORIGINAL */}
                                <div
                                    className="relative"
                                    style={{
                                        background:
                                            originalHex,
                                    }}
                                >
                                    <span
                                        className="
                                            absolute
                                            left-2
                                            bottom-2
                                            text-xs
                                            sm:text-sm
                                            font-black
                                            text-white
                                            bg-black/35
                                            px-2
                                            py-1
                                            rounded-md
                                        "
                                    >
                                        {originalHex}
                                    </span>
                                </div>

                                {/* GUESS */}
                                <div
                                    className="relative"
                                    style={{
                                        background:
                                            guessHex,
                                    }}
                                >
                                    <span
                                        className="
                                            absolute
                                            right-2
                                            bottom-2
                                            text-xs
                                            sm:text-sm
                                            font-black
                                            text-white
                                            bg-black/35
                                            px-2
                                            py-1
                                            rounded-md
                                        "
                                    >
                                        {guessHex}
                                    </span>
                                </div>
                            </div>

                            <div className="hidden sm:block h-[70px] w-px bg-zinc-600" />

                            <div
                                className="
                                    col-span-2
                                    sm:col-span-1
                                    text-right
                                    font-black
                                    text-3xl
                                    sm:text-4xl
                                    text-green-400
                                "
                            >
                                {result.score.toFixed(2)}

                                <span className="text-zinc-400 text-xl sm:text-2xl">
                                    {" "}
                                    /10
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={onBackToMenu}
                className="
                    w-full
                    mt-8
                    bg-green-500
                    hover:bg-green-400
                    text-black
                    font-black
                    py-4
                    sm:py-5
                    rounded-2xl
                    text-lg
                    sm:text-xl
                    transition
                "
            >
                BACK TO MENU
            </button>
        </div>
    );
}

export default ColorFinalSummary;