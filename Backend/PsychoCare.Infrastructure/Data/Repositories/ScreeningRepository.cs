using Microsoft.EntityFrameworkCore;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Interfaces;
using PsychoCare.Infrastructure.Data.Context;

namespace PsychoCare.Infrastructure.Data.Repositories
{
    public class ScreeningRepository : IScreeningRepository
    {
        private readonly PsychoCareDBContext _context;

        public ScreeningRepository(PsychoCareDBContext context)
        {
            _context = context;
        }

        public async Task<int> RegisterScreening(Screening newScreening)
        {
            await _context.Screenings.AddAsync(newScreening);
            await _context.SaveChangesAsync();
            return newScreening.Id;
        }

        public async Task<IEnumerable<Screening>> GetList()
        {
            return await _context.Screenings.Where(s => s.Disabled == false).OrderBy(s => s.Urgency).ThenByDescending(s => s.ContactDate).ToListAsync();
        }

        public async Task<Screening?> GetById(int id)
        {
            return await _context.Screenings.Where(s => s.Id == id && s.Disabled==false).FirstOrDefaultAsync();
        }

        public async Task EditScreening(Screening screening)
        {
            _context.Screenings.Update(screening);
            await _context.SaveChangesAsync();
        }
    }
}
