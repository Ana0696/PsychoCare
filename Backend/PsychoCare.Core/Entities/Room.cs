namespace PsychoCare.Core.Entities
{
    public class Room : BaseEntity
    {
        public string Name { get; private set; }
        public bool AllowGroupSession { get; private set; }
        public bool SpecialNeeds { get; private set; }
        public bool Pediatric { get; private set; }
        public bool IsActive { get; private set; }

        public virtual IEnumerable<Session> Sessions { get; set; }
        public virtual IEnumerable<Appointment> Appointments { get; set; }

        public Room() { }

        public Room(string name, bool allowGroupSession, bool specialNeeds, bool pediatric, bool isActive)
        {
            Name = name;
            AllowGroupSession = allowGroupSession;
            SpecialNeeds = specialNeeds;
            Pediatric = pediatric;
            IsActive = isActive;
        }

        public void EditRoom(string name, bool allowGroupSession, bool specialNeeds, bool pediatric, bool isActive)
        {
            Name = name;
            AllowGroupSession = allowGroupSession;
            SpecialNeeds = specialNeeds;
            Pediatric = pediatric;
            IsActive = isActive;
        }
    }
}
