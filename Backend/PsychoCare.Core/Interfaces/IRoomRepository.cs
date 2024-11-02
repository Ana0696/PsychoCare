using PsychoCare.Core.Entities;

namespace PsychoCare.Core.Interfaces
{
    public interface IRoomRepository
    {
        Task<int> RegisterRoom(Room newRoom);
        Task<IEnumerable<Room>> GetList();
        Task<Room?> GetById(int id);
        Task EditRoom(Room room);
    }
}
