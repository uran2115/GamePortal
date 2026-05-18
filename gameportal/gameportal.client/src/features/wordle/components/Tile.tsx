interface TileProps {
    letter?: string;
    status?: string;
    revealed?: boolean;
}

function Tile({
    letter,
    status,
    revealed = true,
}: TileProps) {
    const getColor = () => {
        switch (status) {
            case "correct":
                return "bg-[#6aaa64]";

            case "present":
                return "bg-[#c9b458]";

            case "absent":
                return "bg-[#3a3a3c]";

            default:
                return "";
        }
    };

    return (
        <div
            className={`
                w-[60px]
                h-[60px]
                border-2
                border-[#3a3a3c]
                flex
                items-center
                justify-center
                text-[32px]
                font-bold
                uppercase
                transition-all
                duration-500
                ${getColor()}
            `}
            style={{
                background:
                    revealed || !status
                        ? undefined
                        : "#121213",

                transform:
                    revealed
                        ? "rotateX(360deg)"
                        : "rotateX(0deg)",
            }}
        >
            {letter}
        </div>
    );
}

export default Tile;