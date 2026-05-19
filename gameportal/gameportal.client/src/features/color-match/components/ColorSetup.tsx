interface ColorSetupProps {
    onStart: () => void;
}

function ColorSetup({
    onStart,
}: ColorSetupProps) {
    return (
        <div className="w-full max-w-xl bg-zinc-900/80 border border-zinc-800 rounded-[32px] p-10 backdrop-blur">
            <h1 className="text-6xl font-black text-center mb-10">
                COLOR MATCH
            </h1>

            <button
                onClick={onStart}
                className="
                    w-full
                    bg-green-500
                    hover:bg-green-400
                    text-black
                    font-black
                    text-2xl
                    py-5
                    rounded-2xl
                "
            >
                START GAME
            </button>
        </div>
    );
}

export default ColorSetup;