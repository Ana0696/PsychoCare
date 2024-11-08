using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychoCare.Application.InputModels.Patient;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Patient;
using PsychoCare.Core.Entities.Enums;
using System.Security.Claims;

namespace PsychoCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        public readonly IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [Authorize(Roles = "secretary,manager,intern")]
        [HttpGet("list/screening")]
        [ProducesResponseType(typeof(Response<IEnumerable<PatientListScreeningViewModel>>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetListScreening()
        {
            var response = await _patientService.GetListScreening();
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [Authorize(Roles = "secretary,manager,intern")]
        [HttpGet("list")]
        [ProducesResponseType(typeof(Response<IEnumerable<PatientListScreeningViewModel>>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetList()
        {
            int? id = User.FindFirst(ClaimTypes.Role)?.Value == UserRole.intern.ToString() ?
                    int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0") :
                    null;
            var response = await _patientService.GetList(id);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [Authorize(Roles = "secretary,manager")]
        [HttpPost("register")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register(PatientInputModel request)
        {
            var response = await _patientService.Register(request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [Authorize(Roles = "secretary,manager,intern")]
        [HttpGet("{patientId}")]
        [ProducesResponseType(typeof(Response<PatientViewModel>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetById(int patientId)
        {
            int? userId = User.FindFirst(ClaimTypes.Role)?.Value == UserRole.intern.ToString() ?
                    int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0") :
                    null;
            var response = await _patientService.GetById(patientId, userId);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Edit
        [Authorize(Roles = "secretary,manager")]
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> EditById(int id, [FromBody] PatientInputModel request)
        {
            var response = await _patientService.EditById(id, request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Edit
        [Authorize(Roles = "secretary,manager,intern")]
        [HttpPut("session/{sessionId}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> EditSessionById(int sessionId, [FromBody] SessionInputModel request)
        {
            int? userId = User.FindFirst(ClaimTypes.Role)?.Value == UserRole.intern.ToString() ?
                    int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0") :
                    null;
            var response = await _patientService.EditSessionById(sessionId, request, userId);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [Authorize(Roles = "secretary,manager,intern")]
        [HttpPost("{id}/file")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UploadFile(int id, IFormFile file)
        {
            var response = await _patientService.UploadFile(id, file);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [Authorize(Roles = "secretary,manager,intern")]
        [HttpGet("file/{fileId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> DownloadFile(int fileId)
        {
            int? userId = User.FindFirst(ClaimTypes.Role)?.Value == UserRole.intern.ToString() ?
                    int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0") :
                    null;
            var response = await _patientService.DownloadFile(fileId, userId);
            if (response == null)
            {
                return NotFound("Arquivo não encontrado.");
            }

            return File(response.File, "application/octet-stream", response.FileName);
        }

        [Authorize(Roles = "secretary,manager,intern")]
        [HttpDelete("file/{fileId}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> DeleteFile(int fileId)
        {
            int? userId = User.FindFirst(ClaimTypes.Role)?.Value == UserRole.intern.ToString() ?
                    int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0") :
                    null;
            var response = await _patientService.DeleteFile(fileId, userId);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }
    }
}
