using Microsoft.AspNetCore.Mvc;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels.Auth;
using PsychoCare.Application.ViewModels;
using System.ComponentModel.DataAnnotations;
using PsychoCare.Application.InputModels.UserManagement;
using PsychoCare.Application.Services.Implementations;
using PsychoCare.Application.ViewModels.UserManagement;

namespace PsychoCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly IUserManagementService _userManagementService;

        public UserManagementController(IUserManagementService userManagementService)
        {
            _userManagementService = userManagementService;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register(RegisterInputModel request)
        {
            var response =  await _userManagementService.Register(request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("list")]
        [ProducesResponseType(typeof(Response<UserListViewModel>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetList()
        {   
            var response = await _userManagementService.GetList();
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Response<UserViewModel>), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _userManagementService.GetById(id);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }

        //Edit
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Response), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> EditById(int id, EditUserInputModel request)
        {
            var response = await _userManagementService.EditById(id, request);
            if (response?.Success == true)
                return Ok(response);

            return BadRequest(response);
        }


        
    }
}
