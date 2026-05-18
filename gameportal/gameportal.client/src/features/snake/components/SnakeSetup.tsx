import type {
    SnakeSkin,
} from "../types/snakeTypes";

interface SnakeSetupProps {
    selectedSkin: SnakeSkin;

    setSelectedSkin: (
        skin: SnakeSkin
    ) => void;

    boardSize: number;

    setBoardSize: (
        size: number
    ) => void;

    onStart: () => void;
}

function SnakeSetup({
    selectedSkin,
    setSelectedSkin,
    boardSize,
    setBoardSize,
    onStart,
}: SnakeSetupProps) {
    return (
        <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center">
            <div
                className="
                    bg-zinc-900
                    border
                    border-zinc-800
                    rounded-[32px]
                    p-10
                    w-[420px]
                    flex
                    flex-col
                    gap-8
                "
            >
                <h1 className="text-5xl font-black text-center">
                    SNAKE
                </h1>

                <div>
                    <p className="mb-3 font-bold text-lg">
                        Skin
                    </p>

                    <div className="flex gap-4">
                        {[
                            "green",
                            "purple",
                            "blue",
                        ].map((skin) => (
                            <button
                                key={skin}
                                onClick={() =>
                                    setSelectedSkin(
                                        skin as SnakeSkin
                                    )
                                }
                                className={`
                                    flex-1
                                    h-16
                                    rounded-2xl
                                    border-2
                                    transition
                                    ${selectedSkin ===
                                        skin
                                        ? "border-white scale-105"
                                        : "border-zinc-700"
                                    }
                                    ${skin ===
                                        "green"
                                        ? "bg-green-500"
                                        : skin ===
                                            "purple"
                                            ? "bg-purple-500"
                                            : "bg-sky-500"
                                    }
                                `}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-3 font-bold text-lg">
                        Map Size
                    </p>

                    <div className="flex gap-4">
                        {[
                            {
                                label: "Small",
                                value: 10,
                            },

                            {
                                label: "Medium",
                                value: 14,
                            },

                            {
                                label: "Large",
                                value: 18,
                            },
                        ].map((size) => (
                            <button
                                key={size.value}
                                onClick={() =>
                                    setBoardSize(
                                        size.value
                                    )
                                }
                                className={`
                                    flex-1
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    transition
                                    ${boardSize ===
                                        size.value
                                        ? "bg-white text-black"
                                        : "bg-zinc-800"
                                    }
                                `}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onStart}
                    className="
                        mt-4
                        bg-green-500
                        hover:bg-green-400
                        text-black
                        font-black
                        py-4
                        rounded-2xl
                        text-xl
                        transition
                    "
                >
                    PLAY
                </button>
            </div>
        </div>
    );
}

export default SnakeSetup;