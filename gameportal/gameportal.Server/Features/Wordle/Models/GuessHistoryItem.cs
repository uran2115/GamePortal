namespace gameportal.Server.Features.Wordle.Models;

public class GuessHistoryItem
{
    public string Guess { get; set; } = string.Empty;

    public List<GuessResult> Results { get; set; } = new();
}