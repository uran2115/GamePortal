import Cell from "./Cell";

import type {
    CellValue,
    WinnerLine,
} from "../types/ticTacToeTypes";

interface GameBoardProps {
    board: CellValue[];
    onCellClick: (
        index: number
    ) => void;

    winningLine?: WinnerLine;
}

function getLineClasses(
    winningLine?: WinnerLine
) {
    if (!winningLine)
        return "";

    const line = winningLine.join(",");

    switch (line) {
        // poziome
        case "0,1,2":
            return "top-[16.5%] left-0 w-full h-1";

        case "3,4,5":
            return "top-1/2 -translate-y-1/2 left-0 w-full h-1";

        case "6,7,8":
            return "bottom-[16.5%] left-0 w-full h-1";

        // pionowe
        case "0,3,6":
            return "left-[16.5%] top-0 h-full w-1";

        case "1,4,7":
            return "left-1/2 -translate-x-1/2 top-0 h-full w-1";

        case "2,5,8":
            return "right-[16.5%] top-0 h-full w-1";

        // skos lewy
        case "0,4,8":
            return `
        top-[50%]
        left-[50%]
        w-[170%]
        h-1
        origin-center
        -translate-x-1/2
        -translate-y-1/2
        rotate-45
    `;

        // skos prawy
        case "2,4,6":
            return `
        top-[50%]
        left-[50%]
        w-[170%]
        h-1
        origin-center
        -translate-x-1/2
        -translate-y-1/2
        -rotate-45
    `;

        default:
            return "";
    }
}

function GameBoard({
    board,
    onCellClick,
    winningLine,
}: GameBoardProps) {
    return (
        <div className="relative overflow-hidden">
            <div className="grid grid-cols-3 gap-2">
                {board.map(
                    (cell, index) => (
                        <Cell
                            key={index}
                            value={cell}
                            onClick={() =>
                                onCellClick(
                                    index
                                )
                            }
                        />
                    )
                )}
            </div>

            {winningLine && (
                <div
                    className={`
                        absolute
                        bg-orange-500
                        rounded-full
                        origin-center
                        animate-[growLine_0.4s_ease-out_forwards]
                        ${getLineClasses(
                        winningLine
                    )}
                    `}
                />
            )}
        </div>
    );
}

export default GameBoard;