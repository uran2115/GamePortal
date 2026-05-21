interface SequenceCellProps {
    isActive: boolean;
    disabled: boolean;
    onClick: () => void;
}

function SequenceCell({
    isActive,
    disabled,
    onClick,
}: SequenceCellProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                w-24
                h-24
                sm:w-32
                sm:h-32
                rounded-2xl
                border-2
                transition-all
                duration-200
                ${isActive
                    ? "bg-green-400 border-green-300 shadow-[0_0_35px_rgba(74,222,128,0.9)] scale-105"
                    : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                }
                ${disabled
                    ? "cursor-default"
                    : "cursor-pointer"
                }
            `}
        />
    );
}

export default SequenceCell;