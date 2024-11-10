using PsychoCare.Application.InputModels.Appointment;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Appointment;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IAppointmentService
    {
        Task<Response> Register(int userId, RegisterAppointmentInputModel request);
        Task<Response<IEnumerable<AppointmentViewModel>>> GetList(int? userId);
    }
}
