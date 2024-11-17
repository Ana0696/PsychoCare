using PsychoCare.Application.InputModels.Reports;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Reports;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IReportService
    {
        Task<Response<IEnumerable<ReportViewModel>>> Report(ReportInputModel report, int userId);
    }
}
