using PsychoCare.Application.InputModels.Auth;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Auth;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Response<LoginResponse>> Login(LoginInputModel request);
    }
}
