import { Link } from "react-router-dom";

import SequenceBoard from "../components/SequenceBoard";
import SequenceStart from "../components/SequenceStart";
import SequenceGameOverModal from "../components/SequenceGameOverModal";

import {
    useSequenceMemory,
} from "../hooks/useSequenceMemory";

function SequenceMemoryPage() {
    const {
        phase,
        level,
        score,
        activeCell,
        clickedCell,
        successFlash,
        startGame,
        backToStart,
        handleCellClick,
    } = useSequenceMemory();

    return (
        <div
            className={`
                min-h-screen
                text-white
                flex
                items-center
                justify-center
                p-6
                relative
                overflow-hidden
                transition-colors
                duration-100
                ${successFlash
                    ? "bg-slate-950"
                    : "bg-[#09090b]"
                }
            `}
        >
            <div
                className={`
                    absolute
                    inset-0
                    pointer-events-none
                    transition-opacity
                    duration-300
                    ${successFlash
                        ? "opacity-100 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.45),transparent_55%)]"
                        : "opacity-100 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%)]"
                    }
                `}
            />

            <Link
                to="/"
                className="
                    absolute
                    top-6
                    left-6
                    bg-zinc
                    hover:bg-zinc-700
                    px-4
                    py-2
                    rounded-xl
                    font-bold
                    z-20
                "
            >
                ← Back
            </Link>

            <div className="relative z-10 flex flex-col items-center">
                {phase === "start" ? (
                    <SequenceStart
                        onStart={
                            startGame
                        }
                    />
                ) : (
                    <>
                        <h1 className="text-5xl font-black mb-4">
                            Sequence Memory
                        </h1>

                        <div className="mb-8 text-3xl font-black text-green-400">
                            Level {level}
                        </div>

                        <SequenceBoard
                            activeCell={
                                activeCell
                            }
                            clickedCell={
                                clickedCell
                            }
                            disabled={
                                phase !== "input"
                            }
                            onCellClick={
                                handleCellClick
                            }
                        />

                        <p className="mt-8 text-zinc-400 font-bold">
                            {successFlash
                                ? "Great!"
                                : phase === "showing"
                                    ? "Remember sequence..."
                                    : "Your turn"}
                        </p>
                    </>
                )}
            </div>

            <SequenceGameOverModal
                isOpen={
                    phase === "gameOver"
                }
                score={score}
                onBackToMenu={
                    backToStart
                }
                onRestart={
                    startGame
                }
            />
        </div>
    );
}

export default SequenceMemoryPage;