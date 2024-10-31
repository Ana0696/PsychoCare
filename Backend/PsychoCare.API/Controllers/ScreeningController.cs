using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychoCare.Application.InputModels.Screening;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Screening;

namespace PsychoCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScreeningController : ControllerBase
    {
        private readonly IScreeningService _screeningService;
        public ScreeningController(IScreeningService screeningService)
        {
            _screeningService = screeningService;
        }

        [Authorize(Roles = "secretary,manager")]
        [HttpPost("register")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register(RegisterScreeningInputModel request)
        {
            var response = await _screeningService.Register(request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [Authorize(Roles = "secretary,manager,intern")]
        [HttpGet("list")]
        [ProducesResponseType(typeof(Response<IEnumerable<ScreeningListViewModel>>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetList()
        {
            var response = await _screeningService.GetList();
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [Authorize(Roles = "secretary,manager,intern")]
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Response<ScreeningViewModel>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _screeningService.GetById(id);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Edit
        [Authorize(Roles = "secretary,manager")]
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> EditById(int id, [FromBody] EditScreeningInputModel request)
        {
            var response = await _screeningService.EditById(id, request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Disable
        [Authorize(Roles = "secretary,manager")]
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> DisableById(int id)
        {
            var response = await _screeningService.DisableById(id);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }
    }
}
