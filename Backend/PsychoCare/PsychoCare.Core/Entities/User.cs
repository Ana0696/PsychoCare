using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Core.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Email { get; private set; }
        public string Period { get; private set; }
        public string Password { get; private set; }
        public UserRole Role { get; private set; }
        public bool IsActive { get; private set; } = true;

        public virtual IEnumerable<ScheduleBlock> ScheduleBlocks { get; set; }

        public User(int id, string name, string surname, DateTime birthDate, string phoneNumber, string email, string period, string password, UserRole role, bool isActive)
        {
            Id = id;
            Name = name;
            Surname = surname;
            BirthDate = birthDate;
            PhoneNumber = phoneNumber;
            Email = email;
            Period = period;
            Password = password;
            Role = role;
            IsActive = isActive;

        }

        public void EditUser(string name, string surname, DateTime birthDate, string phoneNumber, string email, string period, string password, UserRole role, bool isActive)
        {
            Name = name;
            Surname = surname;
            BirthDate = birthDate;
            PhoneNumber = phoneNumber;
            Email = email;
            Period = period;
            Password = password;
            Role = role;
            IsActive = isActive;
        }
    }
}
