import type { AnimatedRow, GameState, } from "../types/wordleTypes";
import Tile from "./Tile";

interface BoardProps {
    gameState: GameState | null;
    guess: string;
    animatedRow: AnimatedRow | null;
    revealedIndexes: number[];
}

function Board({
    gameState,
    guess,
    animatedRow,
    revealedIndexes,
}: BoardProps) {
    const historyRows =
        gameState?.guessHistory.length || 0;

    const currentGuessRow =
        gameState?.status ===
            "InProgress" && !animatedRow
            ? 1
            : 0;

    const animatedGuessRow =
        animatedRow ? 1 : 0;

    const emptyRows =
        (gameState?.maxAttempts || 6) -
        historyRows -
        currentGuessRow -
        animatedGuessRow;

    return (
        <div className="flex flex-col gap-2">
            {/* Historia */}
            {gameState?.guessHistory.map(
                (history, index) => (
                    <div
                        key={index}
                        className="flex gap-2"
                    >
                        {history.results.map(
                            (result, i) => (
                                <Tile
                                    key={i}
                                    letter={
                                        result.letter
                                    }
                                    status={
                                        result.status
                                    }
                                />
                            )
                        )}
                    </div>
                )
            )}

            {/* Animowany rząd */}
            {animatedRow && (
                <div className="flex gap-2">
                    {animatedRow.results.map(
                        (result, i) => {
                            const revealed =
                                revealedIndexes.includes(
                                    i
                                );

                            return (
                                <Tile
                                    key={i}
                                    letter={
                                        result.letter
                                    }
                                    status={
                                        result.status
                                    }
                                    revealed={
                                        revealed
                                    }
                                />
                            );
                        }
                    )}
                </div>
            )}

            {/* Aktualny wpis */}
            {gameState?.status ===
                "InProgress" &&
                !animatedRow && (
                    <div className="flex gap-2">
                        {Array.from({
                            length: 5,
                        }).map((_, i) => (
                            <Tile
                                key={i}
                                letter={guess[i]}
                            />
                        ))}
                    </div>
                )}

            {/* Puste wiersze */}
            {Array.from({
                length: emptyRows,
            }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex gap-2"
                >
                    {Array.from({
                        length: 5,
                    }).map((_, colIndex) => (
                        <Tile
                            key={colIndex}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;