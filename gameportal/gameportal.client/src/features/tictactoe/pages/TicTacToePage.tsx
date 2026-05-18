import { Link } from "react-router-dom";

import GameBoard from "../components/GameBoard";
import GameSetup from "../components/GameSetup";
import ResultModal from "../components/ResultModal";

import { useTicTacToe } from "../hooks/useTicTacToe";

function TicTacToePage() {
    const {
        gameState,
        config,
        startGame,
        handleCellClick,
        resetGame,
        showResultModal,
    } = useTicTacToe();

    if (!config) {
        return (
            <GameSetup
                onStart={startGame}
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#121213] text-white flex flex-col items-center justify-center p-6 relative">
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
                    rounded-lg
                    font-bold
                    transition
                "
            >
                ← Powrót
            </Link>

            <h1 className="text-5xl font-bold mb-8">
                Kółko krzyżyk
            </h1>

            <GameBoard
                board={gameState.board}
                onCellClick={
                    handleCellClick
                }
                winningLine={
                    gameState.winningLine
                }
            />

            <ResultModal
                isOpen={
                    showResultModal
                }
                winner={
                    gameState.winner
                }
                playerSymbol={
                    config.playerSymbol
                }
                onRestart={resetGame}
            />
        </div>
    );
}

export default TicTacToePage;