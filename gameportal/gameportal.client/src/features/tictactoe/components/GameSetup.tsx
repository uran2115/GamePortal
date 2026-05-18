import { useState } from "react";

interface Props {
    onStart: (
        difficulty: string,
        playerSymbol: "X" | "O"
    ) => void;
}

function GameSetup({
    onStart,
}: Props) {
    const [difficulty, setDifficulty] =
        useState("medium");

    const [symbol, setSymbol] =
        useState<"X" | "O">("X");

    return (
        <div className="min-h-screen bg-[#121213] text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-5xl font-bold mb-10">
                Kółko krzyżyk
            </h1>

            <div className="bg-[#1f1f1f] p-8 rounded-2xl w-full max-w-md">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Wybierz poziom
                    </h2>

                    <div className="flex flex-col gap-3">
                        {[
                            {
                                label: "Łatwy",
                                value: "easy",
                            },
                            {
                                label: "Średni",
                                value: "medium",
                            },
                            {
                                label: "Niemożliwy",
                                value: "impossible",
                            },
                        ].map((level) => (
                            <button
                                key={level.value}
                                onClick={() =>
                                    setDifficulty(
                                        level.value
                                    )
                                }
                                className={`p-3 rounded-lg font-bold transition ${difficulty ===
                                        level.value
                                        ? "bg-orange-500"
                                        : "bg-zinc-700 hover:bg-zinc-600"
                                    }`}
                            >
                                {level.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Wybierz symbol
                    </h2>

                    <div className="flex gap-4">
                        {["X", "O"].map(
                            (s) => (
                                <button
                                    key={s}
                                    onClick={() =>
                                        setSymbol(
                                            s as
                                            | "X"
                                            | "O"
                                        )
                                    }
                                    className={`flex-1 p-4 rounded-lg text-3xl font-bold transition ${symbol === s
                                            ? "bg-orange-500"
                                            : "bg-zinc-700 hover:bg-zinc-600"
                                        }`}
                                >
                                    {s}
                                </button>
                            )
                        )}
                    </div>
                </div>

                <button
                    onClick={() =>
                        onStart(
                            difficulty,
                            symbol
                        )
                    }
                    className="w-full bg-orange-500 hover:bg-orange-600 p-4 rounded-lg font-bold text-xl transition"
                >
                    Rozpocznij grę
                </button>
            </div>
        </div>
    );
}

export default GameSetup;