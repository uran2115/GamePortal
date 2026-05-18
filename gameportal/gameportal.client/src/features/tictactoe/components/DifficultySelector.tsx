import type {
    Difficulty,
    Player,
} from "../types/ticTacToeTypes";

interface Props {
    selectedDifficulty: Difficulty;
    selectedSymbol: Player;

    onDifficultyChange: (
        difficulty: Difficulty
    ) => void;

    onSymbolChange: (
        symbol: Player
    ) => void;

    onStart: () => void;
}

function DifficultySelector({
    selectedDifficulty,
    selectedSymbol,
    onDifficultyChange,
    onSymbolChange,
    onStart,
}: Props) {
    return (
        <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-3 items-center">
                <h2 className="text-2xl font-bold">
                    Choose Symbol
                </h2>

                <div className="flex gap-4">
                    {["X", "O"].map(
                        (symbol) => (
                            <button
                                key={symbol}
                                onClick={() =>
                                    onSymbolChange(
                                        symbol as Player
                                    )
                                }
                                className={`
                                    px-6 py-3 rounded-lg font-bold text-xl
                                    ${selectedSymbol ===
                                        symbol
                                        ? "bg-green-600"
                                        : "bg-zinc-800"}
                                `}
                            >
                                {symbol}
                            </button>
                        )
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-3 items-center">
                <h2 className="text-2xl font-bold">
                    Difficulty
                </h2>

                <div className="flex gap-4">
                    {[
                        "easy",
                        "medium",
                        "impossible",
                    ].map((difficulty) => (
                        <button
                            key={difficulty}
                            onClick={() =>
                                onDifficultyChange(
                                    difficulty as Difficulty
                                )
                            }
                            className={`
                                px-6 py-3 rounded-lg capitalize font-bold
                                ${selectedDifficulty ===
                                    difficulty
                                    ? "bg-green-600"
                                    : "bg-zinc-800"}
                            `}
                        >
                            {difficulty}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={onStart}
                className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl font-bold text-xl"
            >
                Start Game
            </button>
        </div>
    );
}

export default DifficultySelector;