interface SnakeGameOverModalProps {
    isOpen: boolean;
    score: number;
    onBackToMenu: () => void;
}

function SnakeGameOverModal({
    isOpen,
    score,
    onBackToMenu,
}: SnakeGameOverModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99999]">
            <div className="bg-zinc-900 border border-zinc-700 p-10 rounded-3xl text-center">
                <h2 className="text-4xl font-black mb-4">
                    GAME OVER
                </h2>

                <p className="text-2xl mb-6">
                    Score: {score}
                </p>

                <button
                    onClick={
                        onBackToMenu
                    }
                    className="
                        bg-green-500
                        hover:bg-green-400
                        text-black
                        font-black
                        px-8
                        py-4
                        rounded-2xl
                        transition
                    "
                >
                    Back to menu
                </button>
            </div>
        </div>
    );
}

export default SnakeGameOverModal;