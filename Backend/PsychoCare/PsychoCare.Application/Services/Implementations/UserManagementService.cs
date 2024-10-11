using Microsoft.Extensions.Configuration;
using PsychoCare.Application.InputModels.UserManagement;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.UserManagement;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Interfaces;

namespace PsychoCare.Application.Services.Implementations
{
    public class UserManagementService : IUserManagementService
    {
        private readonly IUserRepository _userRepository;

        public UserManagementService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public async Task<Response> Register(RegisterInputModel request)
        {
            bool check = await _userRepository.CheckEmailExists(request.Email);

            if (check) 
            {
                return new Response(false, "Email já cadastrado."); 
            }

            User newUser = new User(request.Name, request.Surname, request.BirthDate, request.Genre, request.PhoneNumber,
                request.Email, request.Period, BCrypt.Net.BCrypt.HashPassword(request.Password), request.Role, request.IsActive, 
                request.ScheduleBlocks.Select(x => new ScheduleBlock(x.StartTime, x.EndTime, x.WeekDay, x.Observation)).ToList());

            
            await _userRepository.RegisterUser(newUser);
            return new Response();
        }

        public async Task<Response<IEnumerable<UserListViewModel>>> GetList()
        {
            var list = await _userRepository.GetList();

            return new Response<IEnumerable<UserListViewModel>>(list.Select(u => 
                new UserListViewModel()
                {
                    Id = u.Id,
                    Name = u.Name,
                    Surname = u.Surname,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    Role = u.Role
                }
            ));
        }

        public async Task<Response<UserViewModel>> GetById(int id)
        {
            var user = await _userRepository.GetById(id);

            if (user == null)
            {
                return new Response<UserViewModel>(false, "Usuário não encontrado.");
            }

            var userVm = new UserViewModel()
            {
                Id = user.Id,
                Name = user.Name,
                Surname = user.Surname,
                BirthDate = user.BirthDate,
                Genre = user.Genre,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Period = user.Period,
                Role = user.Role,
                IsActive = user.IsActive,
                ScheduleBlocks = user.ScheduleBlocks.Select(u =>
                new ScheduleBlockInputModel() 
                { 
                    StartTime = u.StartTime,
                    EndTime = u.EndTime,
                    WeekDay = u.WeekDay,
                    Observation = u.Observation,
                })
            };

            return new Response<UserViewModel>(userVm);
        }

        public async Task<Response> EditById(int id, EditUserInputModel request)
        {
            var user = await _userRepository.GetById(id);

            if (user == null)
            {
                return new Response(false, "Usuário não encontrado.");
            }

            await _userRepository.RemoveScheduleBlocks(user.ScheduleBlocks);

            user.EditUser(request.Name, request.Surname, request.BirthDate, request.Genre, request.PhoneNumber, 
                request.Email, request.Period, request.Role, request.IsActive, 
                request.ScheduleBlocks.Select( u => new ScheduleBlock(
                    u.StartTime, u.EndTime, u.WeekDay, u.Observation)).ToList());

            await _userRepository.EditUser(user);

            return new Response();
        }
    }
}
