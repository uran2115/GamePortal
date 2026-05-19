import {
    rgbToHex,
} from "../utils/rgbToHex";

import type {
    RoundResult,
} from "../types/colorMatchTypes";

interface ColorResultModalProps {
    result: RoundResult;
    totalRounds: number;
    onNext: () => void;
}

function ColorResultModal({
    result,
    totalRounds,
    onNext,
}: ColorResultModalProps) {
    const originalHex =
        rgbToHex(
            result.originalColor
        );

    const guessHex =
        rgbToHex(
            result.guessColor
        );

    const isLastRound =
        result.round === totalRounds;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-10 w-full max-w-3xl">
                <h2 className="text-5xl font-black text-center mb-2">
                    {result.score.toFixed(2)} / 10
                </h2>

                <p className="text-center text-zinc-400 font-bold mb-8">
                    Round {result.round} / {totalRounds}
                </p>

                <div
                    className="
                        grid
                        grid-cols-2
                        overflow-hidden
                        rounded-[32px]
                        border
                        border-white/10
                        h-64
                    "
                >
                    <div
                        className="relative"
                        style={{
                            background:
                                originalHex,
                        }}
                    >
                        <div className="absolute top-4 left-4 bg-black/50 px-4 py-2 rounded-xl font-bold">
                            Original
                        </div>

                        <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 rounded-xl font-black">
                            {originalHex.toUpperCase()}
                        </div>
                    </div>

                    <div
                        className="relative"
                        style={{
                            background:
                                guessHex,
                        }}
                    >
                        <div className="absolute top-4 right-4 bg-black/50 px-4 py-2 rounded-xl font-bold">
                            Your guess
                        </div>

                        <div className="absolute bottom-4 right-4 bg-black/50 px-4 py-2 rounded-xl font-black">
                            {guessHex.toUpperCase()}
                        </div>
                    </div>
                </div>

                <button
                    onClick={onNext}
                    className="
                        w-full
                        mt-10
                        bg-green-500
                        hover:bg-green-400
                        text-black
                        font-black
                        py-5
                        rounded-2xl
                        text-xl
                    "
                >
                    {isLastRound
                        ? "SHOW SUMMARY"
                        : "NEXT COLOR"}
                </button>
            </div>
        </div>
    );
}

export default ColorResultModal;