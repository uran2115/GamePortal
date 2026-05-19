interface AccuracyBarProps {
    accuracy: number;
}

function AccuracyBar({
    accuracy,
}: AccuracyBarProps) {
    return (
        <div className="w-full max-w-md">
            <div className="h-5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                    className="
                        h-full
                        bg-green-500
                        transition-all
                        duration-700
                    "
                    style={{
                        width: `${accuracy}%`,
                    }}
                />
            </div>
        </div>
    );
}

export default AccuracyBar;