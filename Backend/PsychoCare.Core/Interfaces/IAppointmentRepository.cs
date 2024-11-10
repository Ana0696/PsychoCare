using PsychoCare.Core.Entities;

namespace PsychoCare.Core.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<int> RegisterAppointment(Appointment newAppointment);
        Task<bool> FreeSlot(int roomId, int userId, DateTime startDate, DateTime endDate);
        Task<IEnumerable<Appointment>> GetList();
    }
}
