using Microsoft.EntityFrameworkCore;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Interfaces;
using PsychoCare.Infrastructure.Data.Context;

namespace PsychoCare.Infrastructure.Data.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly PsychoCareDBContext _context;

        public PatientRepository(PsychoCareDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Patient>> GetList(int? userId)
        {
            return await _context.Patients.Where(p => userId == null ? true : p.Sessions.Any(s => s.UserId == userId)).OrderBy(p => p.Name).ToListAsync();
        }

        public async Task<int> RegisterPatient(Patient newPatient)
        {
            await _context.Patients.AddAsync(newPatient);
            await _context.SaveChangesAsync();
            return newPatient.Id;
        }

        public async Task<Patient?> GetById(int patientId, int? userId)
        {
            return await _context.Patients.Include(p => p.Files)
                .Include(p => p.Sessions).ThenInclude(s => s.User)
                .Include(p => p.Sessions).ThenInclude(s => s.Room)
                .Where(p => p.Id == patientId && userId == null ? true : p.Sessions.Any(s => s.UserId == userId)).FirstOrDefaultAsync();
        }

        public async Task EditPatient(Patient patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }

        public async Task<Session?> GetSessionById(int sessionId, int? userId)
        {
            return await _context.Sessions.Where(p => p.Id == sessionId && userId == null ? true : p.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task EditSession(Session session)
        {
            _context.Sessions.Update(session);
            await _context.SaveChangesAsync();
        }

        public async Task<int> RegisterPatientFile(PatientFile newPatientFile)
        {
            await _context.PatientFiles.AddAsync(newPatientFile);
            await _context.SaveChangesAsync();
            return newPatientFile.Id;
        }

        public async Task<PatientFile?> GetPatientFileById(int fileId, int? userId)
        {
            return await _context.PatientFiles.Where(p => p.Id == fileId && userId == null ? true : p.Patient.Sessions.Any(s => s.UserId == userId)).FirstOrDefaultAsync();
        }

        public async Task RemovePatientFile(PatientFile patientFile)
        {
            _context.PatientFiles.Remove(patientFile);
            await _context.SaveChangesAsync();
        }
    }
}
