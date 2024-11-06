namespace PsychoCare.Application.ViewModels.Patient
{
    public class PatientListScreeningViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool SpecialNeeds { get; set; }
    }
}
