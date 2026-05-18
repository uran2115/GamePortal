using gameportal.Server.Features.Wordle.Data;
using gameportal.Server.Features.Wordle.Models;

namespace gameportal.Server.Features.Wordle.Services;

public class GameService : IGameService
{
    private static readonly Dictionary<Guid, Game> Games = new();

    public Game StartGame()
    {
        var game = new Game
        {
            TargetWord = WordRepository.GetRandomWord()
        };

        Games[game.Id] = game;

        return game;
    }

    public GuessResponse MakeGuess(GuessRequest request)
    {
        if (!Games.ContainsKey(request.GameId))
        {
            return new GuessResponse
            {
                Success = false,
                Error = "Game not found"
            };
        }

        var game = Games[request.GameId];

        if (game.Status != GameStatus.InProgress)
        {
            return new GuessResponse
            {
                Success = false,
                Error = "Game already finished"
            };
        }

        var guess = request.Guess.ToLowerInvariant();

        if (guess.Length != 5)
        {
            return new GuessResponse
            {
                Success = false,
                Error = "Word must be 5 letters"
            };
        }

        if (!WordRepository.IsValidWord(guess))
        {
            return new GuessResponse
            {
                Success = false,
                Error = "Słowo nie istnieje"
            };
        }

        var result = new List<GuessResult>();

        var target = game.TargetWord.ToCharArray();
        var guessArr = guess.ToCharArray();

        var letterUsage = new Dictionary<char, int>();

        foreach (var c in target)
        {
            if (!letterUsage.ContainsKey(c))
                letterUsage[c] = 0;

            letterUsage[c]++;
        }

        for (int i = 0; i < 5; i++)
        {
            result.Add(new GuessResult
            {
                Letter = guessArr[i].ToString(),
                Status = "absent"
            });
        }

        for (int i = 0; i < 5; i++)
        {
            if (guessArr[i] == target[i])
            {
                result[i].Status = "correct";
                letterUsage[guessArr[i]]--;
            }
        }

        for (int i = 0; i < 5; i++)
        {
            if (result[i].Status == "correct")
                continue;

            var letter = guessArr[i];

            if (letterUsage.ContainsKey(letter) &&
                letterUsage[letter] > 0)
            {
                result[i].Status = "present";
                letterUsage[letter]--;
            }
        }

        game.GuessHistory.Add(new GuessHistoryItem
        {
            Guess = guess,
            Results = result
        });

        game.Attempts++;

        if (guess == game.TargetWord)
        {
            game.Status = GameStatus.Won;
            game.RevealedWord = game.TargetWord;
        }
        else if (game.Attempts >= game.MaxAttempts)
        {
            game.Status = GameStatus.Lost;
            game.RevealedWord = game.TargetWord;
        }

        return new GuessResponse
        {
            Success = true,
            Results = result
        };
    }
    public Game GetGame(Guid gameId)
    {
        if (!Games.ContainsKey(gameId))
            throw new Exception("Game not found");

        return Games[gameId];
    }
    public void Surrender(Guid gameId)
    {
        if (!Games.ContainsKey(gameId))
            throw new Exception("Game not found");

        var game = Games[gameId];

        game.Status = GameStatus.Lost;

        game.RevealedWord = game.TargetWord;
    }
}