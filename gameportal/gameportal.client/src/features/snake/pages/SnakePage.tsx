import { Link } from "react-router-dom";

import SnakeBoard from "../components/SnakeBoard";
import SnakeGameOverModal from "../components/SnakeGameOverModal";

import { useSnake } from "../hooks/useSnake";

import type { SnakeSkin } from "../types/snakeTypes";

function SnakePage() {
    const {
        snake,
        food,
        score,
        gameOver,
        backToMenu,

        boardSize,
        setBoardSize,

        selectedSkin,
        setSelectedSkin,

        gameStarted,
        startGame,
    } = useSnake();

    return (
        <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%)]" />

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
                    transition
                    z-10
                "
            >
                ← Powrót
            </Link>

            {!gameStarted ? (
                <div className="relative z-10 w-full max-w-xl bg-zinc-900/80 border border-zinc-800 rounded-[32px] p-10 backdrop-blur">
                    <h1 className="text-5xl font-black text-center mb-10 tracking-wider">
                        SNAKE
                    </h1>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            Skin
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                "green",
                                "purple",
                                "blue",
                            ].map(
                                (skin) => (
                                    <button
                                        key={
                                            skin
                                        }
                                        onClick={() =>
                                            setSelectedSkin(
                                                skin as SnakeSkin
                                            )
                                        }
                                        className={`
                                            h-24
                                            rounded-2xl
                                            border-2
                                            transition-all
                                            ${selectedSkin ===
                                                skin
                                                ? "border-white scale-105"
                                                : "border-zinc-700"
                                            }

                                            ${skin ===
                                                "green"
                                                ? "bg-gradient-to-br from-green-400 to-green-700"
                                                : ""
                                            }

                                            ${skin ===
                                                "purple"
                                                ? "bg-gradient-to-br from-fuchsia-400 to-purple-700"
                                                : ""
                                            }

                                            ${skin ===
                                                "blue"
                                                ? "bg-gradient-to-br from-cyan-300 to-blue-700"
                                                : ""
                                            }
                                        `}
                                    />
                                )
                            )}
                        </div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            Map size
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            <button
                                onClick={() =>
                                    setBoardSize(
                                        10
                                    )
                                }
                                className={`
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    border-2
                                    transition
                                    ${boardSize ===
                                        10
                                        ? "border-green-400 bg-green-500/20"
                                        : "border-zinc-700 bg-zinc-800"
                                    }
                                `}
                            >
                                Small
                            </button>

                            <button
                                onClick={() =>
                                    setBoardSize(
                                        14
                                    )
                                }
                                className={`
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    border-2
                                    transition
                                    ${boardSize ===
                                        14
                                        ? "border-green-400 bg-green-500/20"
                                        : "border-zinc-700 bg-zinc-800"
                                    }
                                `}
                            >
                                Medium
                            </button>

                            <button
                                onClick={() =>
                                    setBoardSize(
                                        18
                                    )
                                }
                                className={`
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    border-2
                                    transition
                                    ${boardSize ===
                                        18
                                        ? "border-green-400 bg-green-500/20"
                                        : "border-zinc-700 bg-zinc-800"
                                    }
                                `}
                            >
                                Large
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={
                            startGame
                        }
                        className="
                            w-full
                            bg-green-500
                            hover:bg-green-400
                            text-black
                            font-black
                            text-xl
                            py-5
                            rounded-2xl
                            transition
                        "
                    >
                        START GAME
                    </button>
                </div>
            ) : (
                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="text-5xl font-black tracking-wider mb-6">
                        SNAKE
                    </h1>

                    <div className="mb-6 text-2xl font-bold">
                        Score: {score}
                    </div>

                    <SnakeBoard
                        snake={snake}
                        food={food}
                        boardSize={
                            boardSize
                        }
                        selectedSkin={
                            selectedSkin
                        }
                    />

                    <SnakeGameOverModal
                        isOpen={
                            gameOver
                        }
                        score={score}
                        onBackToMenu={
                            backToMenu
                        }
                    />
                </div>
            )}
        </div>
    );
}

export default SnakePage;