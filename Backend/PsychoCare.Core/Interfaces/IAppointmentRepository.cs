using PsychoCare.Core.Entities;

namespace PsychoCare.Core.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<int> RegisterAppointment(Appointment newAppointment);
        Task<bool> FreeSlot(int roomId, int userId, DateTime startDate, DateTime endDate);
        Task<IEnumerable<Appointment>> GetList();
        Task EditAppointment(Appointment appointment);
        Task<Appointment?> GetById(int id);
        Task<Session?> GetSessionByAppointmentId(int id);
        Task<int> RegisterSession(Session newSession);
        Task EditSession(Session session);
    }
}
