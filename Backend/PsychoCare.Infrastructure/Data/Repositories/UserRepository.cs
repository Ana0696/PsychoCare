using Microsoft.EntityFrameworkCore;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Interfaces;
using PsychoCare.Infrastructure.Data.Context;

namespace PsychoCare.Infrastructure.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly PsychoCareDBContext _context;

        public UserRepository(PsychoCareDBContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.IsActive);
        }

        public async Task<bool> CheckEmailExists(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<int> RegisterUser(User newUser) 
        { 
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return newUser.Id;
        }

        public async Task<IEnumerable<User>> GetList()
        {
           return await _context.Users.OrderBy(u => u.IsActive).ThenBy(u => u.Name).ToListAsync();
        }

        public async Task<User?> GetById(int id)
        {
            return await _context.Users.Include(u => u.ScheduleBlocks).Where(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task RemoveScheduleBlocks(IEnumerable<ScheduleBlock> scheduleBlocks)
        {
            _context.ScheduleBlocks.RemoveRange(scheduleBlocks);

            await _context.SaveChangesAsync();
        }

        public async Task EditUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
