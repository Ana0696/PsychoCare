using Microsoft.AspNetCore.Mvc;
using PsychoCare.Application.InputModels.Auth;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels.Auth;

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
        [ProducesResponseType(typeof(LoginResponse), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Login([FromBody] LoginInputModel request)
        {
            var response = await _authService.Login(request);
            if (response == null)
                return Unauthorized();

            return Ok(response);
        }
    }
}
