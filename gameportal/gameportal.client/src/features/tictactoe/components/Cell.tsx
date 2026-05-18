import type {
    CellValue,
} from "../hooks/useTicTacToe";

interface CellProps {
    value: CellValue;
    onClick: () => void;
}

function Cell({
    value,
    onClick,
}: CellProps) {
    return (
        <button
            onClick={onClick}
            className={`
                w-28
                h-28
                border
                border-zinc-700
                text-5xl
                font-bold
                flex
                items-center
                justify-center
                transition-all
                duration-300
            `}
        >
            {value}
        </button>
    );
}

export default Cell;