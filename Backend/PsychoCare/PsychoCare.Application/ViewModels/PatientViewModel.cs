namespace PsychoCare.Application.ViewModels
{
    public class PatientViewModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime ContactDate { get; set; }
        public bool Urgency { get; set; }
        public string TimePreference { get; set; }
        public string Observations { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
