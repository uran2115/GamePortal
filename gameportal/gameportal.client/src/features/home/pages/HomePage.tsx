import { Link } from "react-router-dom";

function HomePage() {
    const games = [
        {
            path: "/wordle",
            title: "WORDLE PL",
            description: "Zgadnij 5-literowe słowo",
        },
        {
            path: "/tictactoe",
            title: "Kółko krzyżyk",
            description: "Zagraj przeciwko AI",
        },
        {
            path: "/snake",
            title: "Snake",
            description: "Klasyczny snake w neonowym stylu",
        },
        {
            path: "/color-match",
            title: "Color Match",
            description: "Zapamiętaj i odtwórz kolor",
        },
        {
            path: "/sequence-memory",
            title: "Sequence Memory",
            description: "Zapamiętaj kolejność pól",
        },
        {
            path: "/number-memory",
            title: "Number Memory",
            description: "Zapamiętaj coraz dłuższą liczbę",
        },
    ];

    return (
        <div className="min-h-screen bg-[#121213] text-white p-10">
            <h1 className="text-5xl font-bold mb-10">
                🎮 Game Portal
            </h1>

            <div className="flex gap-5 flex-wrap">
                {games.map((game) => (
                    <Link
                        key={game.path}
                        to={game.path}
                        className="no-underline text-white"
                    >
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
                                {game.title}
                            </h2>

                            <p>{game.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HomePage;