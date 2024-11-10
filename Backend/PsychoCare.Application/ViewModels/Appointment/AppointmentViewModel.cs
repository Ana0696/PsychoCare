namespace PsychoCare.Application.ViewModels.Appointment
{
    public class AppointmentViewModel
    {
        public int? Id { get; set; }
        public int? PatientId { get; set; }
        public string? PatientName { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public int? UserId { get; set; }
        public string? UserName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool? SpecialNeeds { get; set; }
        public bool? Urgency { get; set; }
    }
}
