interface NumberStartProps {
    onStart: () => void;
}

function NumberStart({
    onStart,
}: NumberStartProps) {
    return (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-[32px] p-10 w-full max-w-xl text-center">
            <h1 className="text-5xl font-black mb-6">
                Number Memory
            </h1>

            <p className="text-zinc-400 font-bold mb-10">
                Remember the number shown, then guess what was the number.
            </p>

            <button
                onClick={onStart}
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
                START GAME
            </button>
        </div>
    );
}

export default NumberStart;