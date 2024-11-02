namespace PsychoCare.Core.Entities
{
    public class Room : BaseEntity
    {
        public string Name { get; private set; }
        public bool AllowGroupSession { get; private set; }
        public bool SpecialNeeds { get; private set; }
        public bool Pediatric { get; private set; }
        public bool Disabled { get; private set; } = false;

        public Room(string name, bool allowGroupSession, bool specialNeeds, bool pediatric)
        {
            Name = name;
            AllowGroupSession = allowGroupSession;
            SpecialNeeds = specialNeeds;
            Pediatric = pediatric;
        }

        public void EditRoom(string name, bool allowGroupSession, bool specialNeeds, bool pediatric)
        {
            Name = name;
            AllowGroupSession = allowGroupSession;
            SpecialNeeds = specialNeeds;
            Pediatric = pediatric;
        }

        public void DisableRoom()
        {
            Disabled = true;
        }
    }
}
