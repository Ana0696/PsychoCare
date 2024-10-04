using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Application.ViewModels
{
    public class UserViewModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Period { get; set; }
        public UserRole Role { get; set; }
        public bool IsActive { get; set; }
    }
}
