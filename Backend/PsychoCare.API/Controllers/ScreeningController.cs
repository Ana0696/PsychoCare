using Microsoft.AspNetCore.Mvc;
using PsychoCare.Application.InputModels.Screening;
using PsychoCare.Application.InputModels.UserManagement;
using PsychoCare.Application.Services.Implementations;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Screening;
using PsychoCare.Application.ViewModels.UserManagement;

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

        [HttpGet("list")]
        [ProducesResponseType(typeof(Response<ScreeningListViewModel>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetList()
        {
            var response = await _screeningService.GetList();
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

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
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> EditById(int id, EditScreeningInputModel request)
        {
            var response = await _screeningService.EditById(id, request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Disable
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
