import { Link } from "react-router-dom";

import NumberDisplay from "../components/NumberDisplay";
import NumberInput from "../components/NumberInput";
import NumberStart from "../components/NumberStart";
import NumberSuccess from "../components/NumberSuccess";
import NumberGameOverModal from "../components/NumberGameOverModal";

import {
    useNumberMemory,
} from "../hooks/useNumberMemory";

function NumberMemoryPage() {
    const {
        phase,
        level,
        score,

        numberToRemember,
        answer,
        setAnswer,

        lastAnswer,
        lastNumber,

        progress,

        startGame,
        nextLevel,
        submitAnswer,
        backToStart,
    } = useNumberMemory();

    return (
        <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(250,170,33,0.15),transparent_40%)]" />

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

            <div className="relative z-10 flex flex-col items-center w-full">
                {phase === "start" && (
                    <NumberStart
                        onStart={
                            startGame
                        }
                    />
                )}

                {phase === "showing" && (
                    <NumberDisplay
                        level={level}
                        numberToRemember={
                            numberToRemember
                        }
                        progress={progress}
                    />
                )}

                {phase === "input" && (
                    <NumberInput
                        level={level}
                        answer={answer}
                        setAnswer={
                            setAnswer
                        }
                        onSubmit={
                            submitAnswer
                        }
                    />
                )}

                {phase === "success" && (
                    <NumberSuccess
                        level={level}
                        correctNumber={
                            lastNumber
                        }
                        playerAnswer={
                            lastAnswer
                        }
                        onNext={
                            nextLevel
                        }
                    />
                )}
            </div>

            <NumberGameOverModal
                isOpen={
                    phase === "gameOver"
                }
                score={score}
                correctNumber={
                    lastNumber
                }
                playerAnswer={
                    lastAnswer
                }
                onRestart={
                    startGame
                }
                onBackToMenu={
                    backToStart
                }
            />
        </div>
    );
}

export default NumberMemoryPage;