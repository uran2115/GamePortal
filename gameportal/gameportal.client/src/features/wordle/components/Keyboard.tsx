import { keyboardRows } from "../constants/keyboardRows";

interface KeyboardProps {
    onKeyPress: (
        key: string
    ) => Promise<void>;

    keyStatuses: Record<string, string>;
}

function getKeyColor(status?: string) {
    switch (status) {
        case "correct":
            return "bg-[#6aaa64]";

        case "present":
            return "bg-[#c9b458]";

        case "absent":
            return "bg-[#3a3a3c]";

        default:
            return "bg-zinc-500";
    }
}

function Keyboard({
    onKeyPress,
    keyStatuses,
}: KeyboardProps) {
    return (
        <div className="w-full max-w-[520px] mt-6 px-2">
            <div className="flex flex-col gap-2">
                {keyboardRows.map(
                    (row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex gap-1 w-full"
                        >
                            {row.map((key) => {
                                const isSpecial =
                                    key ===
                                    "ENTER" ||
                                    key === "⌫";

                                return (
                                    <button
                                        key={key}
                                        onClick={() =>
                                            onKeyPress(
                                                key ===
                                                    "⌫"
                                                    ? "BACKSPACE"
                                                    : key
                                            )
                                        }
                                        className={`
                                            h-10
                                            rounded
                                            font-bold
                                            text-white
                                            text-sm
                                            transition-all
                                            active:scale-95
                                            flex
                                            items-center
                                            justify-center
                                            select-none
                                            ${getKeyColor(
                                            keyStatuses[
                                            key.toLowerCase()
                                            ]
                                        )}
                                            ${isSpecial
                                                ? "flex-[1.5]"
                                                : "flex-1"
                                            }
                                        `}
                                    >
                                        {key}
                                    </button>
                                );
                            })}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Keyboard;