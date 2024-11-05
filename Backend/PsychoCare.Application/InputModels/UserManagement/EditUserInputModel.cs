using PsychoCare.Application.ViewModels.UserManagement;
using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Application.InputModels.UserManagement
{
    public class EditUserInputModel
    {
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
