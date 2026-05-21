import SequenceCell from "./SequenceCell";

interface SequenceBoardProps {
    activeCell: number | null;
    clickedCell: number | null;
    disabled: boolean;
    onCellClick: (
        index: number
    ) => void;
}

function SequenceBoard({
    activeCell,
    clickedCell,
    disabled,
    onCellClick,
}: SequenceBoardProps) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {Array.from({
                length: 9,
            }).map((_, index) => (
                <SequenceCell
                    key={index}
                    isActive={
                        activeCell === index ||
                        clickedCell === index
                    }
                    disabled={disabled}
                    onClick={() =>
                        onCellClick(index)
                    }
                />
            ))}
        </div>
    );
}

export default SequenceBoard;