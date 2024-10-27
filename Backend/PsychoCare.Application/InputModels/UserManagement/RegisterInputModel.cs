using PsychoCare.Core.Entities;
using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Application.InputModels.UserManagement
{
    public class RegisterInputModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string? Period { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
        public bool IsActive { get; set; } 
        public int? SupervisorId { get; set; }
        public IEnumerable<ScheduleBlockInputModel>? ScheduleBlocks { get; set; } = new List<ScheduleBlockInputModel>();
    }

    public class ScheduleBlockInputModel
    {
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public DayOfWeek WeekDay { get; set; }
        public string Observation { get; set; }
    }
}
