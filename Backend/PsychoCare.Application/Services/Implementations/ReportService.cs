using PsychoCare.Application.InputModels.Reports;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Reports;
using PsychoCare.Core.Entities.Enums;
using PsychoCare.Core.Interfaces;

namespace PsychoCare.Application.Services.Implementations
{
    public class ReportService : IReportService
    {
        private readonly IUserRepository _userRepository;

        public ReportService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Response<IEnumerable<ReportViewModel>>> Report(ReportInputModel request, int userId)
        {
            var list = await _userRepository.GetReport(request.ActiveOnly, request.UnderMySupervision, userId);

            return new Response<IEnumerable<ReportViewModel>>(list.Select(u =>
                new ReportViewModel()
                {
                    Id = u.Id,
                    InternName = string.Concat(u.Name, " ", u.Surname),
                    InternPeriod = u.Period,
                    SupervisorName = u.Supervisor.Name,
                    CompletedAppointment = u.Appointments.Where(a => a.Status == AppointmentStatus.BothAttended || a.Status == AppointmentStatus.ProfessionalOnlyAttended).Count(),
                    AppointmentHours = u.Appointments
                        .Where(a => a.Status == AppointmentStatus.BothAttended || a.Status == AppointmentStatus.ProfessionalOnlyAttended)
                        .Aggregate(TimeSpan.Zero, (sum, a) => sum + (a.EndDate - a.StartDate))
                }
            ));
        }
    }
}
