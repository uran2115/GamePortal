export const startGameRequest = async () => {
    const response = await fetch("/api/game/start", {
        method: "POST",
    });

    return response.json();
};

export const getGameRequest = async (
    gameId: string
) => {
    const response = await fetch(
        `/api/game/${gameId}`
    );

    return response.json();
};

export const sendGuessRequest = async (
    gameId: string,
    guess: string
) => {
    const response = await fetch(
        "/api/game/guess",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                gameId,
                guess,
            }),
        }
    );

    return response.json();
};

export async function surrenderGameRequest(gameId: string)
{
    await fetch(
        `/api/game/${gameId}/surrender`,
        {
            method: "POST",
        }
    );
}