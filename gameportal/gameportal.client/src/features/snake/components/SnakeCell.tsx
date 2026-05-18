interface SnakeCellProps {
    type:
    | "snake"
    | "food"
    | "empty";
}

function SnakeCell({
    type,
}: SnakeCellProps) {
    const getColor = () => {
        switch (type) {
            case "snake":
                return "bg-green-500";

            case "food":
                return "bg-red-500";

            default:
                return "bg-zinc-900";
        }
    };

    return (
        <div
            className={`
                w-6
                h-6
                border
                border-zinc-800
                ${getColor()}
            `}
        />
    );
}

export default SnakeCell;