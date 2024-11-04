using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PsychoCare.Application.InputModels.Room;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Room;

namespace PsychoCare.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "secretary,manager")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register(RegisterRoomInputModel request)
        {
            var response = await _roomService.Register(request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("list")]
        [ProducesResponseType(typeof(Response<IEnumerable<RoomViewModel>>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetList()
        {
            var response = await _roomService.GetList();
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Response<RoomViewModel>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _roomService.GetById(id);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Edit
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> EditById(int id, RegisterRoomInputModel request)
        {
            var response = await _roomService.EditById(id, request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }
    }
}
