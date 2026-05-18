namespace gameportal.Server.Features.Wordle.Models;

public class GuessRequest
{
    public Guid GameId { get; set; }
    public string Guess { get; set; } = string.Empty;
}