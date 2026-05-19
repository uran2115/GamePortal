import { Link } from "react-router-dom";

import ColorDisplay from "../components/ColorDisplay";
import ColorPicker from "../components/ColorPicker";
import ColorResultModal from "../components/ColorResultModal";
import ColorSetup from "../components/ColorSetup";
import ColorFinalSummary from "../components/ColorFinalSummary";

import {
    useColorMatch,
} from "../hooks/useColorMatch";

import {
    rgbToHex,
} from "../utils/rgbToHex";

function ColorMatchPage() {
    const {
        phase,

        round,
        totalRounds,

        targetColor,
        guessColor,
        setGuessColor,

        previewTimeLeft,

        latestResult,
        roundResults,
        totalScore,

        startGame,
        submitGuess,
        nextRound,
        backToMenu,
    } = useColorMatch();

    return (
        <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%)]" />

            <Link
                to="/"
                className="
                    absolute
                    top-6
                    left-6
                    bg-zinc-800
                    hover:bg-zinc-700
                    px-4
                    py-2
                    rounded-xl
                    font-bold
                    z-20
                "
            >
                ← Powrót
            </Link>

            <div className="relative z-10">
                {phase === "setup" && (
                    <ColorSetup
                        onStart={
                            startGame
                        }
                    />
                )}

                {phase === "preview" && (
                    <ColorDisplay
                        color={rgbToHex(
                            targetColor
                        )}
                        timeLeft={
                            previewTimeLeft
                        }
                        round={round}
                        totalRounds={
                            totalRounds
                        }
                    />
                )}

                {phase === "guess" && (
                    <div className="flex flex-col items-center gap-8">
                        <div className="text-xl font-bold text-zinc-400">
                            Round {round} / {totalRounds}
                        </div>

                        <ColorPicker
                            color={
                                guessColor
                            }
                            onChange={
                                setGuessColor
                            }
                        />

                        <button
                            onClick={
                                submitGuess
                            }
                            className="
                                bg-green-500
                                hover:bg-green-400
                                text-black
                                font-black
                                px-12
                                py-5
                                rounded-2xl
                                text-xl
                            "
                        >
                            SUBMIT
                        </button>
                    </div>
                )}

                {phase === "roundResult" &&
                    latestResult && (
                        <ColorResultModal
                            result={
                                latestResult
                            }
                            totalRounds={
                                totalRounds
                            }
                            onNext={
                                nextRound
                            }
                        />
                    )}

                {phase === "finalResult" && (
                    <ColorFinalSummary
                        results={
                            roundResults
                        }
                        totalScore={
                            totalScore
                        }
                        maxScore={
                            totalRounds * 10
                        }
                        onBackToMenu={
                            backToMenu
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default ColorMatchPage;