interface SequenceStartProps {
    onStart: () => void;
}

function SequenceStart({
    onStart,
}: SequenceStartProps) {
    return (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-[32px] p-10 w-full max-w-xl text-center">
            <h1 className="text-5xl font-black mb-6">
                Sequence Memory
            </h1>

            <p className="text-zinc-400 font-bold mb-10">
                Remember the order of the highlighted boxes and click them in the same order.
            </p>

            <button
                onClick={onStart}
                className="
                    w-full
                    bg-green-500
                    hover:bg-green-400
                    text-black
                    font-black
                    text-xl
                    py-5
                    rounded-2xl
                    transition
                "
            >
                START GAME
            </button>
        </div>
    );
}

export default SequenceStart;