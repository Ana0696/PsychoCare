using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Core.Entities
{
    public class Patient : BaseEntity
    {
        public string Name { get; private set; }
        public PatientGroup Group { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string PhoneNumber { get; private set; }
        public bool SpecialNeeds { get; private set; }
        public string Email { get; private set; }
        public string Document { get; private set; }
        public string Gender { get; private set; }
        public string Observations { get; private set; }
        public string Profession { get; private set; }
        public string GuardianName { get; private set; }
        public DateTime? GuardianBirthDate { get; private set; }
        public string GuardianPhoneNumber { get; private set; }
        public string GuardianDocument { get; private set; }
        public string GuardianGender { get; private set; }

        public virtual Address Address { get; set; }
        public virtual IEnumerable<Screening> Screenings { get; set; }
        public virtual IEnumerable<Session> Sessions { get; set; }
        public virtual IEnumerable<PatientFile> Files { get; set; }
    }
}
