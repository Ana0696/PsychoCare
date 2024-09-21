using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Core.Entities
{
    public class User : BaseEntity
    {
        public User(int id, string name, string surname, string email, string password, UserRole role)
        {
            Id = id;
            Name = name;
            Surname = surname;
            Email = email;
            Password = password;
            Role = role;
        }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }

        public void EditUser(string name, string surname, string email, string password, UserRole role)
        {
            Name = name;
            Surname = surname;
            Email = email;
            Password = password;
        }
    }
}
