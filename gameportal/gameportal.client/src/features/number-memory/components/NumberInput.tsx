interface NumberInputProps {
    level: number;
    answer: string;
    setAnswer: (value: string) => void;
    onSubmit: () => void;
}

function NumberInput({
    level,
    answer,
    setAnswer,
    onSubmit,
}: NumberInputProps) {
    const isEmpty =
        answer.trim().length === 0;

    return (
        <div className="flex flex-col items-center w-full max-w-xl">
            <h1 className="text-5xl font-black mb-4">
                Number Memory
            </h1>

            <div className="text-3xl font-black text-orange-400 mb-8">
                Level {level}
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-[32px] p-8 w-full">
                <p className="text-zinc-400 font-bold mb-4 text-center">
                    What was the number?
                </p>

                <input
                    value={answer}
                    onChange={(e) =>
                        setAnswer(
                            e.target.value.replace(/\D/g, "")
                        )
                    }
                    onKeyDown={(e) => {
                        if (
                            e.key === "Enter" &&
                            !isEmpty
                        ) {
                            onSubmit();
                        }
                    }}
                    autoFocus
                    className="
                        w-full
                        bg-zinc-800
                        border
                        border-zinc-700
                        rounded-2xl
                        px-6
                        py-5
                        text-center
                        text-4xl
                        font-black
                        outline-none
                        focus:border-white
                    "
                />

                <button
                    disabled={isEmpty}
                    onClick={onSubmit}
                    className={`
                        w-full
                        mt-6
                        font-black
                        text-xl
                        py-5
                        rounded-2xl
                        transition
                        ${isEmpty
                            ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-400 text-black"
                        }
                    `}
                >
                    SUBMIT
                </button>
            </div>
        </div>
    );
}

export default NumberInput;