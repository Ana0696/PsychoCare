using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Application.ViewModels.Patient
{
    public class PatientViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public PatientGroup Group { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public bool SpecialNeeds { get; set; }
        public string Email { get; set; }
        public string Document { get; set; }
        public string Gender { get; set; }
        public string Observations { get; set; }
        public string Profession { get; set; }
        public string GuardianName { get; set; }
        public DateTime? GuardianBirthDate { get; set; }
        public string GuardianPhoneNumber { get; set; }
        public string GuardianDocument { get; set; }
        public string GuardianGender { get; set; }
        public IEnumerable<SessionListViewModel> Sessions { get; set; }
        public IEnumerable<PatientFileViewModel> Files { get; set; }
    }
}
