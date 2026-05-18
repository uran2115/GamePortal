using Microsoft.AspNetCore.Mvc;
using gameportal.Server.Features.Wordle.Models;
using gameportal.Server.Features.Wordle.Services;

namespace gameportal.Server.Features.Wordle.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly IGameService _gameService;

    public GameController(IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpPost("start")]
    public ActionResult<Game> StartGame()
    {
        var game = _gameService.StartGame();
        return Ok(game);
    }

    [HttpPost("guess")]
    public ActionResult<GuessResponse> MakeGuess([FromBody] GuessRequest request)
    {
        var result = _gameService.MakeGuess(request);
        return Ok(result);
    }

    [HttpGet("{gameId}")]
    public ActionResult<Game> GetGame(Guid gameId)
    {
        var game = _gameService.GetGame(gameId);

        return Ok(game);
    }

    [HttpPost("{gameId}/surrender")]
    public IActionResult Surrender(Guid gameId)
    {
        _gameService.Surrender(gameId);

        return Ok();
    }
}