using PsychoCare.Application.InputModels.UserManagement;
using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Application.ViewModels.UserManagement
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string? Period { get; set; }
        public UserRole Role { get; set; }
        public bool IsActive { get; set; }
        public int? SupervisorId { get; set; }
        public IEnumerable<ScheduleBlockInputModel>? ScheduleBlocks { get; set; } = new List<ScheduleBlockInputModel>();
    }
}
