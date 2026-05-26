interface NumberDisplayProps {
    level: number;
    numberToRemember: string;
    progress: number;
}

function NumberDisplay({
    level,
    numberToRemember,
    progress,
}: NumberDisplayProps) {
    return (
        <div className="flex flex-col items-center w-full max-w-xl">
            <h1 className="text-5xl font-black mb-4">
                Number Memory
            </h1>

            <div className="text-3xl font-black text-orange-400 mb-8">
                Level {level}
            </div>

            <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden mb-10">
                <div
                    className="
                        h-full
                        bg-orange-500
                        transition-[width]
                        duration-100
                        ease-linear
                    "
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>

            <div
                className="
                    bg-zinc-900
                    border
                    border-zinc-800
                    rounded-[32px]
                    px-12
                    py-10
                    min-w-[320px]
                    text-center
                    shadow-[0_0_80px_rgba(0,0,0,0.55)]
                "
            >
                <span className="text-6xl font-black tracking-[0.2em] break-all">
                    {numberToRemember}
                </span>
            </div>

        </div>
    );
}

export default NumberDisplay;