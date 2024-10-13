using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Application.ViewModels.Auth
{
    public class LoginResponse
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public UserRole Role { get; set; }
    }
}
