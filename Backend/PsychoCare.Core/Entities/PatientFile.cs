namespace PsychoCare.Core.Entities
{
    public class PatientFile : BaseEntity
    {
        public int PatientId { get; private set; }
        public string Name { get; private set; }
        public string Path { get; private set; }
        public DateTime Date { get; private set; }

        public virtual Patient Patient { get; set; }
    }
}
