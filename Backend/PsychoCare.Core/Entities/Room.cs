using PsychoCare.Core.Entities.Enums;

namespace PsychoCare.Core.Entities
{
    public class Room : BaseEntity
    {
        public string Name { get; private set; }
        public RoomType Type { get; private set; }
        public bool AllowGroupSession { get; private set; }

        public Room(string name, RoomType type, bool allowGroupSession)
        {
            Name = name;
            Type = type;
            AllowGroupSession = allowGroupSession;
        }

        public void EditRoom(string name, RoomType type, bool allowGroupSession)
        {
            Name = name;
            Type = type;
            AllowGroupSession = allowGroupSession;
        }
    }
}
