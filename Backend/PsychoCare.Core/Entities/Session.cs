namespace PsychoCare.Core.Entities
{
    public class Session : BaseEntity
    {
        public int PatientId { get; private set; }
        public int UserId { get; private set; }
        public int RoomId { get; private set; }
        public string Evolution { get; private set; }
        public string Observation { get; private set; }
        public DateTime Date { get; private set; } = DateTime.Now;

        public virtual Patient Patient { get; set; }
        public virtual User User { get; set; }
        public virtual Room Room { get; set; }
    }
}
