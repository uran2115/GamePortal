interface ColorDisplayProps {
    color: string;
    timeLeft: number;
    round: number;
    totalRounds: number;
}

function ColorDisplay({
    color,
    timeLeft,
    round,
    totalRounds,
}: ColorDisplayProps) {
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="text-xl font-bold text-zinc-400">
                Round {round} / {totalRounds}
            </div>

            <div className="text-7xl font-black tabular-nums">
                {timeLeft}
            </div>

            <div
                className="
                    w-[420px]
                    h-[420px]
                    rounded-[32px]
                    border
                    border-white/10
                    shadow-[0_0_100px_rgba(255,255,255,0.12)]
                "
                style={{
                    background: color,
                }}
            />

            <p className="text-zinc-400 font-bold">
                Remember the color
            </p>
        </div>
    );
}

export default ColorDisplay;