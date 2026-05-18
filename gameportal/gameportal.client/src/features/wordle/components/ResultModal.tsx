interface ResultModalProps {
    isOpen: boolean;
    status?: string;
    revealedWord?: string;
    onRestart: () => void;
}

function ResultModal({
    isOpen,
    status,
    revealedWord,
    onRestart,
}: ResultModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-10 rounded-xl text-center min-w-[320px]">
                <h2 className="text-3xl font-bold mb-4">
                    {status === "Won"
                        ? "🎉 Wygrałeś!"
                        : "💀 Przegrałeś!"}
                </h2>

                <p className="text-xl text-yellow-500 font-bold mb-6">
                    Hasło:{" "}
                    {revealedWord?.toUpperCase()}
                </p>

                <button
                    onClick={onRestart}
                    className="bg-green-500 px-12 py-6 rounded-lg font-bold"
                >
                    Zagraj ponownie
                </button>
            </div>
        </div>
    );
}

export default ResultModal;