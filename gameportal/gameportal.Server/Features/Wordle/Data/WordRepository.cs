namespace gameportal.Server.Features.Wordle.Data;

public static class WordRepository
{
    private static List<string> Words = new();

    static WordRepository()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Features", "Wordle", "Data", "words.txt");

        if (!File.Exists(path))
            throw new Exception($"Words file not found: {path}");

        Words = File.ReadAllLines(path)
            .Select(w => w.Trim().ToLowerInvariant())
            .Where(w => w.Length == 5)
            .Where(w => w.All(char.IsLetter))
            .Distinct()
            .ToList();
    }

    public static string GetRandomWord()
    {
        var rnd = new Random();
        return Words[rnd.Next(Words.Count)];
    }

    public static bool IsValidWord(string word)
    {
        return Words.Contains(word.ToLowerInvariant());
    }
}