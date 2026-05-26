interface NumberSuccessProps {
    level: number;
    correctNumber: string;
    playerAnswer: string;
    onNext: () => void;
}

function NumberSuccess({
    level,
    correctNumber,
    playerAnswer,
    onNext,
}: NumberSuccessProps) {
    return (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-[32px] p-10 w-full max-w-xl text-center">
            <h1 className="text-5xl font-black mb-10 text-orange-400">
                Level {level}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-zinc-800 rounded-2xl p-5">
                    <p className="text-zinc-400 font-bold mb-2">
                        Number
                    </p>

                    <p className="text-3xl font-black break-all">
                        {correctNumber}
                    </p>
                </div>

                <div className="bg-zinc-800 rounded-2xl p-5">
                    <p className="text-zinc-400 font-bold mb-2">
                        Your answer
                    </p>

                    <p className="text-3xl font-black break-all">
                        {playerAnswer}
                    </p>
                </div>
            </div>

            <button
                onClick={onNext}
                className="
                    w-full
                    bg-orange-500
                    hover:bg-orange-400
                    text-black
                    font-black
                    text-xl
                    py-5
                    rounded-2xl
                    transition
                "
            >
                NEXT
            </button>
        </div>
    );
}

export default NumberSuccess;