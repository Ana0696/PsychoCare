namespace PsychoCare.Core.Entities
{
    public class PatientFile : BaseEntity
    {
        public int PatientId { get; private set; }
        public string Name { get; private set; }
        public string Path { get; private set; }
        public DateTime Date { get; private set; } = DateTime.Now;

        public virtual Patient Patient { get; set; }

        public PatientFile() { }

        public PatientFile(int patientId, string name, string path)
        {
            PatientId = patientId;
            Name = name;
            Path = path;
        }
    }
}
