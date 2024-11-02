using Microsoft.EntityFrameworkCore;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Interfaces;
using PsychoCare.Infrastructure.Data.Context;

namespace PsychoCare.Infrastructure.Data.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly PsychoCareDBContext _context;

        public RoomRepository(PsychoCareDBContext context)
        {
            _context = context;
        }

        public async Task<int> RegisterRoom(Room newRoom)
        {
            await _context.Rooms.AddAsync(newRoom);
            await _context.SaveChangesAsync();
            return newRoom.Id;
        }

        public async Task<IEnumerable<Room>> GetList()
        {
            return await _context.Rooms.Where(r => r.Disabled == false).OrderBy(r => r.Name).ToListAsync();
        }

        public async Task<Room?> GetById(int id)
        {
            return await _context.Rooms.Where(r => r.Id == id && r.Disabled == false).FirstOrDefaultAsync();
        }

        public async Task EditRoom(Room room)
        {
            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();
        }
    }
}
