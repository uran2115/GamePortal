using gameportal.Server.Features.Wordle.Models;

namespace gameportal.Server.Features.Wordle.Services;

public interface IGameService
{
    Game StartGame();
    GuessResponse MakeGuess(GuessRequest request);
    Game GetGame(Guid gameId);
    void Surrender(Guid gameId);
}