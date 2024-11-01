namespace PsychoCare.Application.InputModels.Screening
{
    public class EditScreeningInputModel
    {
        public int? PatientId { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string? Email { get; set; }
        public bool Urgency { get; set; }
        public bool SpecialNeeds { get; set; }
        public string? Observation { get; set; }
    }
}
