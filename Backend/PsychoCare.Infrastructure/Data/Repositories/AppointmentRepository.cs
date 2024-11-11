using Microsoft.EntityFrameworkCore;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Interfaces;
using PsychoCare.Infrastructure.Data.Context;

namespace PsychoCare.Infrastructure.Data.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly PsychoCareDBContext _context;

        public AppointmentRepository(PsychoCareDBContext context)
        {
            _context = context;
        }

        public async Task<int> RegisterAppointment(Appointment newAppointment)
        {
            await _context.Appointments.AddAsync(newAppointment);
            await _context.SaveChangesAsync();
            return newAppointment.Id;
        }

        public async Task<bool> FreeSlot(int roomId, int userId, DateTime startDate, DateTime endDate)
        {
            // Verifica se existe conflito de horários na mesma sala
            bool roomConflict = await _context.Appointments
                .AnyAsync(a =>
                    a.RoomId == roomId &&
                    !a.Disabled &&
                    !(a.EndDate <= startDate || a.StartDate >= endDate));

            if (roomConflict)
            {
                return false;
            }

            // Verifica se o usuário tem algum ScheduleBlock que impede o agendamento no horário solicitado
            bool userConflict = await _context.ScheduleBlocks
                .AnyAsync(sb =>
                    sb.UserId == userId &&
                    sb.WeekDay == startDate.DayOfWeek &&
                    !(sb.EndTime <= startDate.TimeOfDay || sb.StartTime >= endDate.TimeOfDay));

            if (userConflict)
            {
                return false;
            }

            return true;
        }

        public async Task<IEnumerable<Appointment>> GetList()
        {
            return await _context.Appointments.Include(a => a.Patient).Include(a => a.Room).Include(a => a.User).Where(s => s.Disabled == false).OrderByDescending(s => s.StartDate).ToListAsync();
        }

        public async Task<Appointment?> GetById(int id)
        {
            return await _context.Appointments.Where(a => a.Id == id && a.Disabled == false).FirstOrDefaultAsync();
        }

        public async Task EditAppointment(Appointment appointment)
        {
            _context.Appointments.Update(appointment);
            await _context.SaveChangesAsync();
        }

        public async Task<Session?> GetSessionByAppointmentId(int id)
        {
            return await _context.Sessions.Where(a => a.AppointmentId == id).FirstOrDefaultAsync();
        }

        public async Task<int> RegisterSession(Session newSession)
        {
            await _context.Sessions.AddAsync(newSession);
            await _context.SaveChangesAsync();
            return newSession.Id;
        }

        public async Task EditSession(Session session)
        {
            _context.Sessions.Update(session);
            await _context.SaveChangesAsync();
        }
    }
}
