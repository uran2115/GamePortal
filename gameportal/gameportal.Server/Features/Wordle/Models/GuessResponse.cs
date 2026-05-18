namespace gameportal.Server.Features.Wordle.Models;

public class GuessResponse
{
    public bool Success { get; set; }

    public string? Error { get; set; }

    public List<GuessResult>? Results { get; set; }
}