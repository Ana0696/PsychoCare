using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychoCare.Application.InputModels.Reports;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Reports;
using System.Security.Claims;

namespace PsychoCare.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "manager,supervisor")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(Response<IEnumerable<ReportViewModel>>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Report([FromQuery] ReportInputModel request)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var response = await _reportService.Report(request, userId);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }
    }
}
