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
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
