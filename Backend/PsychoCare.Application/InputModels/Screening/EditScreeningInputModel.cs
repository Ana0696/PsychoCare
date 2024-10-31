namespace PsychoCare.Application.InputModels.Screening
{
    public class EditScreeningInputModel
    {
        public string Name { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string? Gender { get; private set; }
        public string PhoneNumber { get; private set; }
        public string? Email { get; private set; }
        public bool Urgency { get; private set; }
        public bool SpecialNeeds { get; private set; }
        public string? Observation { get; private set; }
    }
}
