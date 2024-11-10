using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Application.InputModels.Appointment
{
    public class RegisterAppointmentInputModel
    {
        public int? PatientId { get; set; }
        public int RoomId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Urgency { get; set; }
        public bool SpecialNeeds { get; set; }
        public string? PatientName { get; set; }
        public PatientGroup? PatientGroup { get; set; }
        public DateTime? PatientBirthDate { get; set; }
        public string? PatientPhoneNumber { get; set; }
    }
}
