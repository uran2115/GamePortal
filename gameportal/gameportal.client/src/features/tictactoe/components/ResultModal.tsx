interface ResultModalProps {
    isOpen: boolean;
    winner:
    | "X"
    | "O"
    | "draw"
    | null;

    playerSymbol: "X" | "O";

    onRestart: () => void;
}

function ResultModal({
    isOpen,
    winner,
    playerSymbol,
    onRestart,
}: ResultModalProps) {
    if (!isOpen) return null;

    const getTitle = () => {
        if (winner === "draw") {
            return "🤝 Remis";
        }

        if (winner === playerSymbol) {
            return "🎉 Wygrałeś!";
        }

        return "💀 Przegrałeś!";
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-16 rounded-2xl text-center min-w-[320px]">
                <h2 className="text-4xl font-bold mb-12">
                    {getTitle()}
                </h2>

                <button
                    onClick={onRestart}
                    className="
                        bg-orange-700
                        hover:bg-orange-500
                        px-6
                        py-3
                        rounded-xl
                        font-bold
                        transition
                    "
                >
                    Zagraj ponownie
                </button>
            </div>
        </div>
    );
}

export default ResultModal;