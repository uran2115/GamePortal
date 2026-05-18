namespace gameportal.Server.Features.Wordle.Models;

public class Game
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string TargetWord { get; set; } = string.Empty;

    public int Attempts { get; set; } = 0;

    public int MaxAttempts { get; set; } = 6;

    public GameStatus Status { get; set; } = GameStatus.InProgress;

    public List<GuessHistoryItem> GuessHistory { get; set; } = new();

    public string? RevealedWord { get; set; }
}