using PsychoCare.Application.InputModels.Appointment;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Appointment;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IAppointmentService
    {
        Task<Response> Register(int userId, RegisterAppointmentInputModel request);
        Task<Response<IEnumerable<AppointmentViewModel>>> GetList(int? userId);
        Task<Response> DisableById(int id);
        Task<Response> EditDateById(int id, EditDateAppointmentInputModel request);
        Task<Response> EditStatusById(int id, EditStatusAppointmentInputModel request);
        Task<Response<SessionViewModel>> GetSessionByAppointmentId(int id);
        Task<Response> RegisterSessionByAppointmentId(int id, RegisterSessionInputModel request);
    }
}
