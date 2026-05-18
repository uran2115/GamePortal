import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import ResultModal from "../components/ResultModal";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

import { useWordle } from "../hooks/useWordle";

function WordlePage() {
    const {
        gameState,
        guess,
        toast,
        keyStatuses,
        animatedRow,
        revealedIndexes,
        showResultModal,
        handleKey,
        startGame,
        surrenderGame,
    } = useWordle();

    return (
        <div className="min-h-screen bg-[#121213] text-white flex flex-col items-center pt-2">
            <div className="w-full max-w-[900px] flex items-center justify-between px-6 py-4">

                <Link
                    to="/"
                    className="
                        bg-[#121213]
                        hover:bg-zinc-700
                        px-4
                        py-2
                        rounded
                        font-bold
                        transition-all
                    "
                >
                    ← Powrót
                </Link>

                <h1 className="text-5xl font-bold">
                    WORDLE PL
                </h1>

                <button
                    onClick={surrenderGame}
                    className="
                        bg-zinc-500
                        hover:bg-red-500
                        px-4
                        py-2
                        rounded
                        font-bold
                        transition-all
                    "
                >
                    Poddaje się
                </button>
            </div>

            <Board
                gameState={gameState}
                guess={guess}
                animatedRow={animatedRow}
                revealedIndexes={
                    revealedIndexes
                }
            />

            <Keyboard
                onKeyPress={handleKey}
                keyStatuses={keyStatuses}
            />

            <Toast message={toast} />

            <ResultModal
                isOpen={showResultModal}
                status={gameState?.status}
                revealedWord={
                    gameState?.revealedWord
                }
                onRestart={startGame}
            />
        </div>
    );
}

export default WordlePage;