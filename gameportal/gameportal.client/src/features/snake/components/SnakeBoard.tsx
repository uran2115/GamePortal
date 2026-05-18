import type {
    Position,
} from "../types/snakeTypes";

interface SnakeBoardProps {
    snake: Position[];
    food: Position;
    boardSize: number;
    selectedSkin: string;
}

const skins = {
    green: {
        head: "from-green-500 to-green-700",
        body: "from-green-500 to-green-700",
        glow: "shadow-[0_0_18px_rgba(34,197,94,0.8)]",
    },

    purple: {
        head: "from-purple-500 to-fuchsia-700",
        body: "from-purple-500 to-fuchsia-700",
        glow: "shadow-[0_0_18px_rgba(168,85,247,0.8)]",
    },

    blue: {
        head: "from-sky-400 to-blue-600",
        body: "from-sky-400 to-blue-600",
        glow: "shadow-[0_0_18px_rgba(56,189,248,0.8)]",
    },
};

const CELL_SIZE = 28;

function SnakeBoard({
    snake,
    food,
    boardSize,
    selectedSkin,
}: SnakeBoardProps) {
    const activeSkin =
        skins[
        selectedSkin as keyof typeof skins
        ];

    return (
        <div
            className="
                bg-zinc-950
                border-2
                border-zinc-600
                rounded-[32px]
                p-2
                shadow-[0_0_80px_rgba(0,0,0,0.7)]
            "
        >
            <div
                className="
                    relative
                    rounded-[24px]
                    overflow-hidden
                    bg-black
                "
                style={{
                    width:
                        boardSize *
                        CELL_SIZE,

                    height:
                        boardSize *
                        CELL_SIZE,
                }}
            >
                {/* GLOBAL GLOW */}
                <div
                    className="
                        absolute
                        inset-0
                        pointer-events-none
                        blur-md
                        opacity-90
                    "
                >
                    {snake.map(
                        (
                            segment,
                            index
                        ) => (
                            <div
                                key={`glow-${index}`}
                                className={`
                                    absolute
                                    rounded-full
                                    bg-gradient-to-br
                                    ${activeSkin.body}
                                `}
                                style={{
                                    width:
                                        CELL_SIZE -
                                        6,

                                    height:
                                        CELL_SIZE -
                                        6,

                                    left:
                                        segment.x *
                                        CELL_SIZE +
                                        3,

                                    top:
                                        segment.y *
                                        CELL_SIZE +
                                        3,
                                }}
                            />
                        )
                    )}
                </div>

                {/* BODY CONNECTIONS */}
                {snake.map(
                    (
                        segment,
                        index
                    ) => {
                        const next =
                            snake[
                            index + 1
                            ];

                        if (!next)
                            return null;

                        const isHorizontal =
                            segment.y ===
                            next.y;

                        return (
                            <div
                                key={`connection-${index}`}
                                className={`
                                    absolute
                                    bg-gradient-to-br
                                    ${activeSkin.body}
                                    ${activeSkin.glow}
                                `}
                                style={{
                                    zIndex: 1,

                                    left:
                                        Math.min(
                                            segment.x,
                                            next.x
                                        ) *
                                        CELL_SIZE +
                                        4,

                                    top:
                                        Math.min(
                                            segment.y,
                                            next.y
                                        ) *
                                        CELL_SIZE +
                                        4,

                                    width:
                                        isHorizontal
                                            ? CELL_SIZE
                                            : CELL_SIZE -
                                            8,

                                    height:
                                        isHorizontal
                                            ? CELL_SIZE -
                                            8
                                            : CELL_SIZE,

                                    borderRadius:
                                        "999px",
                                }}
                            />
                        );
                    }
                )}

                {/* SNAKE */}
                {snake.map(
                    (
                        segment,
                        index
                    ) => {
                        const isHead =
                            index === 0;

                        const prev =
                            snake[
                            index - 1
                            ];

                        const next =
                            snake[
                            index + 1
                            ];

                        let borderRadius =
                            "999px";

                        let clipPath =
                            "";

                        let direction:
                            | "up"
                            | "down"
                            | "left"
                            | "right" = "right";

                        // HEAD DIRECTION
                        if (
                            isHead &&
                            next
                        ) {
                            if (
                                segment.x >
                                next.x
                            ) {
                                direction =
                                    "right";
                            } else if (
                                segment.x <
                                next.x
                            ) {
                                direction =
                                    "left";
                            } else if (
                                segment.y >
                                next.y
                            ) {
                                direction =
                                    "down";
                            } else {
                                direction =
                                    "up";
                            }
                        }

                        // TAIL
                        else if (
                            !next &&
                            prev
                        ) {
                            borderRadius =
                                "10px";

                            if (
                                segment.x >
                                prev.x
                            ) {
                                direction =
                                    "right";

                                clipPath =
                                    "polygon(0% 0%, 100% 50%, 0% 100%)";
                            }

                            else if (
                                segment.x <
                                prev.x
                            ) {
                                direction =
                                    "left";

                                clipPath =
                                    "polygon(100% 0%, 0% 50%, 100% 100%)";
                            }

                            else if (
                                segment.y >
                                prev.y
                            ) {
                                direction =
                                    "down";

                                clipPath =
                                    "polygon(0% 0%, 50% 100%, 100% 0%)";
                            }

                            else {
                                direction =
                                    "up";

                                clipPath =
                                    "polygon(0% 100%, 50% 0%, 100% 100%)";
                            }
                        }

                        return (
                            <div
                                key={index}
                                className="absolute transition-all duration-75"
                                style={{
                                    width:
                                        CELL_SIZE -
                                        4,

                                    height:
                                        CELL_SIZE -
                                        4,

                                    left:
                                        segment.x *
                                        CELL_SIZE +
                                        2,

                                    top:
                                        segment.y *
                                        CELL_SIZE +
                                        2,

                                    zIndex:
                                        100 -
                                        index,
                                }}
                            >
                                <div
                                    className={`
                                        relative
                                        w-full
                                        h-full
                                        bg-gradient-to-br
                                        ${isHead
                                            ? activeSkin.head
                                            : activeSkin.body
                                        }
                                        ${activeSkin.glow}
                                    `}
                                    style={{
                                        borderRadius,

                                        clipPath:
                                            clipPath ||
                                            undefined,
                                    }}
                                >
                                    {/* EYES */}
                                    {isHead && (
                                        <>
                                            {direction ===
                                                "right" && (
                                                    <>
                                                        <div className="absolute top-[7px] right-[5px] w-[4px] h-[4px] rounded-full bg-black/80" />

                                                        <div className="absolute bottom-[7px] right-[5px] w-[4px] h-[4px] rounded-full bg-black/80" />
                                                    </>
                                                )}

                                            {direction ===
                                                "left" && (
                                                    <>
                                                        <div className="absolute top-[7px] left-[5px] w-[4px] h-[4px] rounded-full bg-black/80" />

                                                        <div className="absolute bottom-[7px] left-[5px] w-[4px] h-[4px] rounded-full bg-black/80" />
                                                    </>
                                                )}

                                            {direction ===
                                                "up" && (
                                                    <>
                                                        <div className="absolute top-[5px] left-[7px] w-[4px] h-[4px] rounded-full bg-black/80" />

                                                        <div className="absolute top-[5px] right-[7px] w-[4px] h-[4px] rounded-full bg-black/80" />
                                                    </>
                                                )}

                                            {direction ===
                                                "down" && (
                                                    <>
                                                        <div className="absolute bottom-[5px] left-[7px] w-[4px] h-[4px] rounded-full bg-black/80" />

                                                        <div className="absolute bottom-[5px] right-[7px] w-[4px] h-[4px] rounded-full bg-black/80" />
                                                    </>
                                                )}
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    }
                )}

                {/* FOOD */}
                <div
                    className="
                        absolute
                        rounded-full
                        bg-red-500
                        shadow-[0_0_25px_rgba(239,68,68,1)]
                        animate-pulse
                    "
                    style={{
                        width: 18,
                        height: 18,

                        left:
                            food.x *
                            CELL_SIZE +
                            5,

                        top:
                            food.y *
                            CELL_SIZE +
                            5,

                        zIndex: 999,
                    }}
                />
            </div>
        </div>
    );
}

export default SnakeBoard;