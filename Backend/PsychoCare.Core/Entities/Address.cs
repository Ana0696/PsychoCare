namespace PsychoCare.Core.Entities
{
    public class Address : BaseEntity
    {
        public int PatientId { get; private set; }
        public string? Street { get; private set; }
        public string? Number { get; private set; }
        public string? Complement { get; private set; }
        public string? Neighborhood { get; private set; }
        public string? City { get; private set; }
        public string? State { get; private set; }
        public string? PostalCode { get; private set; }

        public virtual Patient Patient { get; set; }
    }
}
