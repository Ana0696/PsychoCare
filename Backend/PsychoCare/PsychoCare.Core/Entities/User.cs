using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Core.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string? Genre { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Email { get; private set; }
        public string? Period { get; private set; }
        public string Password { get; private set; }
        public UserRole Role { get; private set; }
        public bool IsActive { get; private set; } = true;

        public virtual IEnumerable<ScheduleBlock>? ScheduleBlocks { get; set; }

        public User() { }

        public User(string name, string surname, DateTime birthDate, string? genre, string phoneNumber, string email, string? period, string password, UserRole role, bool isActive, IEnumerable<ScheduleBlock>? scheduleBlocks )
        {
            Name = name;
            Surname = surname;
            BirthDate = birthDate;
            Genre = genre;
            PhoneNumber = phoneNumber;
            Email = email;
            Period = period;
            Password = password;
            Role = role;
            IsActive = isActive;
            ScheduleBlocks = scheduleBlocks;
        }

        public void EditUser(string name, string surname, DateTime birthDate, string? genre, string phoneNumber, string email, string? period, UserRole role, bool isActive, IEnumerable<ScheduleBlock>? scheduleBlocks)
        {
            Name = name;
            Surname = surname;
            BirthDate = birthDate;
            Genre = genre;
            PhoneNumber = phoneNumber;
            Email = email;
            Period = period;
            Role = role;
            IsActive = isActive;
            ScheduleBlocks = scheduleBlocks;
        }
    }
}
