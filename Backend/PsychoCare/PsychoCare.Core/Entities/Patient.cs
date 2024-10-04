namespace PsychoCare.Core.Entities
{
    public class Patient : BaseEntity
    {
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Email { get; private set; }
        public DateTime ContactDate { get; private set; }
        public bool Urgency { get; private set; }
        public string TimePreference { get; private set; }
        public string Observations { get; private set; }
        public bool IsActive { get; private set; } = true;

        public Patient(int id, string name, string surname, DateTime birthDate, string phoneNumber, string email, DateTime contactDate, bool urgency, string timePreference, string observations, bool isActive) 
        {
            Id = id; 
            Name = name; 
            Surname = surname;
            BirthDate = birthDate;
            PhoneNumber = phoneNumber;
            Email = email;
            ContactDate = contactDate;
            Urgency = urgency;
            TimePreference = timePreference;
            Observations = observations;
            IsActive = isActive;
        }

        public void EditPatient(string name, string surname, DateTime birthDate, string phoneNumber, string email, DateTime contactDate, bool urgency, string timePreference, string observations, bool isActive) 
        {
            Name = name;
            Surname = surname;
            BirthDate = birthDate;
            PhoneNumber = phoneNumber;
            Email = email;
            ContactDate = contactDate;
            Urgency = urgency;
            TimePreference = timePreference;
            Observations = observations;
            IsActive = isActive;
        }
    }
}