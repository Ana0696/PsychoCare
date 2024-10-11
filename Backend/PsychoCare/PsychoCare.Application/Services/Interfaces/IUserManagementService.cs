using PsychoCare.Application.InputModels.UserManagement;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.UserManagement;
using PsychoCare.Core.Entities;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IUserManagementService
    {
        Task<Response> Register(RegisterInputModel request);
        Task<Response<IEnumerable<UserListViewModel>>> GetList();
        Task<Response<UserViewModel>> GetById(int id);
        Task<Response> EditById(int id, EditUserInputModel request);
    }
}