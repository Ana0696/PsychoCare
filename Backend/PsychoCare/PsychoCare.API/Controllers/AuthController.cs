using Microsoft.AspNetCore.Mvc;
using PsychoCare.Application.InputModels.Auth;
using PsychoCare.Application.Services.Interfaces;

namespace PsychoCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginInputModel request)
        {
            var token = await _authService.Login(request);
            if (token == null)
                return Unauthorized();

            return Ok(new { Token = token });
        }
    }
}
