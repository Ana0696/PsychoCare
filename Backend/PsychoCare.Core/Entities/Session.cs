namespace PsychoCare.Core.Entities
{
    public class Session : BaseEntity
    {
        public int PatientId { get; private set; }
        public int UserId { get; private set; }
        public int RoomId { get; private set; }
        public string? Evolution { get; private set; }
        public string? Observation { get; private set; }
        public DateTime Date { get; private set; } = DateTime.Now;

        public virtual Patient Patient { get; set; }
        public virtual User User { get; set; }
        public virtual Room Room { get; set; }

        public Session() { }

        public Session(int patientId, int userId, int roomId, string evolution, string observation)
        {
            PatientId = patientId;
            UserId = userId;
            RoomId = roomId;
            Evolution = evolution;
            Observation = observation;
        }

        public void EditSession(string evolution, string observation)
        {
            Evolution = evolution;
            Observation = observation;
        }
    }
}
