namespace gameportal.Server.Features.Wordle.Models;

public class GuessResult
{
    public string Letter { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    // correct / present / absent
}