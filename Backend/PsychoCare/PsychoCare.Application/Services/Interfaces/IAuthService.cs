using PsychoCare.Application.InputModels.Auth;
using PsychoCare.Application.ViewModels.Auth;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponse> Login(LoginInputModel request);
    }
}
