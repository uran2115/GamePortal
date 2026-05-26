interface NumberGameOverModalProps {
    isOpen: boolean;
    score: number;
    correctNumber: string;
    playerAnswer: string;
    onRestart: () => void;
    onBackToMenu: () => void;
}

function NumberGameOverModal({
    isOpen,
    score,
    correctNumber,
    playerAnswer,
    onRestart,
    onBackToMenu,
}: NumberGameOverModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999]">
            <div className="bg-zinc-900 border border-zinc-700 rounded-[32px] p-10 w-full max-w-md text-center">
                <h2 className="text-4xl font-black mb-4">
                    GAME OVER
                </h2>

                <p className="text-zinc-400 font-bold mb-2">
                    Your score
                </p>

                <p className="text-6xl font-black text-orange-400 mb-8">
                    {score}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-zinc-800 rounded-2xl p-4">
                        <p className="text-zinc-400 font-bold mb-2">
                            Number
                        </p>

                        <p className="text-2xl font-black break-all">
                            {correctNumber}
                        </p>
                    </div>

                    <div className="bg-zinc-800 rounded-2xl p-4">
                        <p className="text-zinc-400 font-bold mb-2">
                            Your answer
                        </p>

                        <p className="text-2xl font-black break-all">
                            {playerAnswer}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={onRestart}
                        className="
                            bg-orange-500
                            hover:bg-orange-400
                            text-black
                            font-black
                            py-4
                            rounded-2xl
                            transition
                        "
                    >
                        Play again
                    </button>

                    <button
                        onClick={onBackToMenu}
                        className="
                            bg-zinc-800
                            hover:bg-zinc-700
                            text-white
                            font-black
                            py-4
                            rounded-2xl
                            transition
                        "
                    >
                        Back to menu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NumberGameOverModal;