using Microsoft.AspNetCore.Http;
using PsychoCare.Application.InputModels.Patient;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Patient;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IPatientService
    {
        Task<Response<IEnumerable<PatientListScreeningViewModel>>> GetListScreening();
        Task<Response<IEnumerable<PatientListScreeningViewModel>>> GetList(int? userId);
        Task<Response> Register(PatientInputModel request);
        Task<Response<PatientViewModel>> GetById(int patientId, int? userId);
        Task<Response> EditById(int id, PatientInputModel request);
        Task<Response> EditSessionById(int sessionId, SessionInputModel request, int? userId);
        Task<Response> UploadFile(int patientId, IFormFile file);
        Task<FileViewModel> DownloadFile(int fileId, int? userId);
        Task<Response> DeleteFile(int fileId, int? userId);
    }
}
