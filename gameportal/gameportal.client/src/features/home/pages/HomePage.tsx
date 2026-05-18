import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div
            className="
                min-h-screen
                bg-[#121213]
                text-white
                p-10
            "
        >
            <h1 className="text-5xl font-bold mb-10">
                🎮 Game Portal
            </h1>

            <div className="flex gap-5 flex-wrap">
                <Link to="/wordle">
                    <div
                        className="
                            w-[250px]
                            h-[150px]
                            bg-[#1f1f1f]
                            rounded-xl
                            p-5
                            border-2
                            border-[#333]
                            hover:border-[#6aaa64]
                            transition
                            cursor-pointer
                        "
                    >
                        <h2 className="text-3xl font-bold mb-3">
                            WORDLE PL
                        </h2>

                        <p>
                            Zgadnij 5-literowe słowo
                        </p>
                    </div>
                </Link>
            </div>
            <div className="flex gap-5 flex-wrap">
                <Link to="/tictactoe">
                    <div
                        className="
                            w-[250px]
                            h-[150px]
                            bg-[#1f1f1f]
                            rounded-xl
                            p-5
                            border-2
                            border-[#333]
                            hover:border-[#6aaa64]
                            transition
                            cursor-pointer
                        "
                    >
                        <h2 className="text-3xl font-bold mb-3">
                            Kółko krzyżyk
                        </h2>

                        <p>
                            OX
                        </p>
                    </div>
                </Link>

            </div>
            <div className="flex gap-5 flex-wrap">
                <Link to="/snake">
                    <div
                        className="
                            w-[250px]
                            h-[150px]
                            bg-[#1f1f1f]
                            rounded-xl
                            p-5
                            border-2
                            border-[#333]
                            hover:border-[#6aaa64]
                            transition
                            cursor-pointer
                        "
                    >
                        <h2 className="text-3xl font-bold mb-3">
                            Kółko krzyżyk
                        </h2>

                        <p>
                            OX
                        </p>
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default HomePage;