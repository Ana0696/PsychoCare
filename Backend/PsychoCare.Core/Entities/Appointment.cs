namespace PsychoCare.Core.Entities
{
    public class Appointment : BaseEntity
    {
        public int PatientId { get; private set; }
        public int UserId { get; private set; }
        public int RoomId { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public bool Urgency { get; private set; }
        public bool SpecialNeeds { get; private set; }
        public bool? PatientAttendance { get; private set; }
        public bool? UserAttendance { get; private set; }
        public bool Disabled { get; private set; } = false;

        public Appointment() { }

        public Appointment(int patientId, int userId, int roomId, DateTime startDate, DateTime endDate, bool urgency, bool specialNeeds)
        {
            PatientId = patientId;
            UserId = userId;
            RoomId = roomId;
            StartDate = startDate;
            EndDate = endDate;
            Urgency = urgency;
            SpecialNeeds = specialNeeds;
        }

        public virtual Patient Patient { get; set; }
        public virtual User User { get; set; }
        public virtual Room Room { get; set; }
        public virtual Session Session { get; set; }
    }
}
