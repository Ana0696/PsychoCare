using PsychoCare.Core.Entities.Enums;
using System.Reflection;

namespace PsychoCare.Core.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string? Gender { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Email { get; private set; }
        public string? Period { get; private set; }
        public string Password { get; private set; }
        public UserRole Role { get; private set; }
        public bool IsActive { get; private set; } = true;
        public int? SupervisorId { get; private set; }

        public virtual IEnumerable<ScheduleBlock>? ScheduleBlocks { get; set; }
        public virtual User Supervisor { get; set; }
        public virtual IEnumerable<User> Interns { get; set; }

        public User() { }

        public User(string name, string surname, DateTime birthDate, string? gender, string phoneNumber, string email, string? period, string password, UserRole role, bool isActive, int? supervisorId, IEnumerable<ScheduleBlock>? scheduleBlocks)
        {
            Name = name;
            Surname = surname;
            BirthDate = birthDate;
            Gender = gender;
            PhoneNumber = phoneNumber;
            Email = email;
            Period = period;
            Password = password;
            Role = role;
            IsActive = isActive;
            SupervisorId = supervisorId;
            ScheduleBlocks = scheduleBlocks;
        }

        public void EditUser(string name, string surname, DateTime birthDate, string? gender, string phoneNumber, string email, string? period, UserRole role, bool isActive, int? supervisorId, IEnumerable<ScheduleBlock>? scheduleBlocks)
        {
            Name = name;
            Surname = surname;
            BirthDate = birthDate;
            Gender = gender;
            PhoneNumber = phoneNumber;
            Email = email;
            Period = period;
            Role = role;
            IsActive = isActive;
            SupervisorId = supervisorId;
            ScheduleBlocks = scheduleBlocks;
        }
    }
}
