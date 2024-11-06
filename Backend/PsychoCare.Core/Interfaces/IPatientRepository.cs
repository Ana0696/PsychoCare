using PsychoCare.Core.Entities;

namespace PsychoCare.Core.Interfaces
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetList(int? userId);
        Task<int> RegisterPatient(Patient newPatient);
        Task<Patient?> GetById(int patientId, int? userId);
        Task EditPatient(Patient patient);
        Task<Session?> GetSessionById(int sessionId, int? userId);
        Task EditSession(Session session);
        Task<int> RegisterPatientFile(PatientFile newPatientFile);
        Task<PatientFile?> GetPatientFileById(int fileId, int? userId);
        Task RemovePatientFile(PatientFile patientFile);
    }
}
