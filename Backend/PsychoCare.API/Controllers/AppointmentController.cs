using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychoCare.Application.InputModels.Appointment;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Appointment;
using PsychoCare.Core.Entities.Enums;
using System.Security.Claims;

namespace PsychoCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [Authorize(Roles = "manager,intern")]
        [HttpPost("register")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register(RegisterAppointmentInputModel request)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var response = await _appointmentService.Register(userId, request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [Authorize(Roles = "secretary,manager,intern")]
        [HttpGet("list")]
        [ProducesResponseType(typeof(Response<IEnumerable<AppointmentViewModel>>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetList()
        {
            int? id = User.FindFirst(ClaimTypes.Role)?.Value == UserRole.intern.ToString() ?
                    int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0") :
                    null;
            var response = await _appointmentService.GetList(id);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Disable
        [Authorize(Roles = "secretary,manager,intern")]
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> DisableById(int id)
        {
            var response = await _appointmentService.DisableById(id);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Edit
        [Authorize(Roles = "secretary,manager,intern")]
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> EditDateById(int id, [FromBody] EditDateAppointmentInputModel request)
        {
            var response = await _appointmentService.EditDateById(id, request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Edit
        [Authorize(Roles = "secretary,manager")]
        [HttpPut("{id}/status")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> EditStatusById(int id, [FromBody] EditStatusAppointmentInputModel request)
        {
            var response = await _appointmentService.EditStatusById(id, request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [Authorize(Roles = "manager,intern")]
        [HttpGet("{id}/session")]
        [ProducesResponseType(typeof(Response<IEnumerable<SessionViewModel>>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetSessionByAppointmentId(int id)
        {
            var response = await _appointmentService.GetSessionByAppointmentId(id);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Edit
        [Authorize(Roles = "manager,intern")]
        [HttpPost("{id}/session")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> RegisterSession(int id, [FromBody] RegisterSessionInputModel request)
        {
            var response = await _appointmentService.RegisterSessionByAppointmentId(id, request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }
    }
}
