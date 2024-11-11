using Microsoft.AspNetCore.Http;
using PsychoCare.Application.InputModels.Patient;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Patient;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Interfaces;

namespace PsychoCare.Application.Services.Implementations
{
    public class PatientService : IPatientService
    {
        public readonly IPatientRepository _patientRepository;

        public PatientService(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        public async Task<Response<IEnumerable<PatientListScreeningViewModel>>> GetListScreening()
        {
            var list = await _patientRepository.GetList(null);

            return new Response<IEnumerable<PatientListScreeningViewModel>>(list.Select(p =>
                new PatientListScreeningViewModel()
                {
                    Id = p.Id,
                    Name = p.Name,
                    BirthDate = p.BirthDate,
                    PhoneNumber = p.PhoneNumber,
                    SpecialNeeds = p.SpecialNeeds,
                    Email = p.Email,
                    Gender = p.Gender
                }
            ));
        }

        public async Task<Response<IEnumerable<PatientListScreeningViewModel>>> GetList(int? userId)
        {
            var list = await _patientRepository.GetList(userId);

            return new Response<IEnumerable<PatientListScreeningViewModel>>(list.Select(p =>
                new PatientListScreeningViewModel()
                {
                    Id = p.Id,
                    Name = p.Name,
                    BirthDate = p.BirthDate,
                    PhoneNumber = p.PhoneNumber,
                    SpecialNeeds = p.SpecialNeeds,
                    Email = p.Email,
                    Gender = p.Gender
                }
            ));
        }

        public async Task<Response> Register(PatientInputModel request)
        {
            Patient newPatient = new Patient(request.Name, request.Group, request.BirthDate,
                request.PhoneNumber, request.SpecialNeeds, request.Email, request.Document,
                request.Gender, request.Observations, request.Profession, request.GuardianName,
                request.GuardianBirthDate, request.GuardianPhoneNumber, request.GuardianDocument,
                request.GuardianGender);

            await _patientRepository.RegisterPatient(newPatient);
            return new Response();
        }

        public async Task<Response<PatientViewModel>> GetById(int patientId, int? userId)
        {
            var patient = await _patientRepository.GetById(patientId, userId);

            if (patient == null)
            {
                return new Response<PatientViewModel>(false, "Paciente não encontrado.");
            }

            var patientVM = new PatientViewModel()
            {
                Id = patient.Id,
                Name = patient.Name,
                BirthDate = patient.BirthDate,
                Gender = patient.Gender,
                Email = patient.Email,
                PhoneNumber = patient.PhoneNumber,
                SpecialNeeds = patient.SpecialNeeds,
                Document = patient.Document,
                Group = patient.Group,
                GuardianBirthDate = patient.GuardianBirthDate,
                GuardianDocument = patient.GuardianDocument,
                GuardianGender = patient.GuardianGender,
                GuardianName = patient.GuardianName,
                GuardianPhoneNumber = patient.GuardianPhoneNumber,
                Observations = patient.Observations,
                Profession = patient.Profession,
                Files = patient.Files.OrderBy(x => x.Date).Select(f =>
                    new PatientFileViewModel()
                    {
                        Id = f.Id,
                        Name = f.Name,
                        Date = f.Date
                    }
                ),
                Sessions = patient.Sessions.OrderByDescending(x => x.Date).Select(s =>
                    new SessionListViewModel()
                    {
                        Id = s.Id,
                        Date = s.Date,
                        Evolution = s.Evolution,
                        Observation = s.Observation,
                        ProfessionalName = s.User.Name,
                        RoomName = s.Room.Name
                    }
                ),
            };

            return new Response<PatientViewModel>(patientVM);
        }

        public async Task<Response> EditById(int id, PatientInputModel request)
        {
            var patient = await _patientRepository.GetById(id, null);

            if (patient == null)
            {
                return new Response(false, "Paciente não encontrado.");
            }

            patient.EditPatient(request.Name, request.Group, request.BirthDate,
                request.PhoneNumber, request.SpecialNeeds, request.Email, request.Document,
                request.Gender, request.Observations, request.Profession, request.GuardianName,
                request.GuardianBirthDate, request.GuardianPhoneNumber, request.GuardianDocument,
                request.GuardianGender);

            await _patientRepository.EditPatient(patient);

            return new Response();
        }

        public async Task<Response> EditSessionById(int sessionId, SessionInputModel request, int? userId)
        {
            var session = await _patientRepository.GetSessionById(sessionId, userId);

            if (session == null)
            {
                return new Response(false, "Sessão não encontrada.");
            }

            session.EditSession(request.Evolution, request.Observation);

            await _patientRepository.EditSession(session);

            return new Response();
        }

        public async Task<Response> UploadFile(int patientId, IFormFile file)
        {
            string _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");

            // Cria a pasta se não existir
            if (!Directory.Exists(_storagePath))
            {
                Directory.CreateDirectory(_storagePath);
            }

            var filePath = Path.Combine(_storagePath, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            PatientFile newPatientFile = new PatientFile(patientId, file.FileName, filePath);
            await _patientRepository.RegisterPatientFile(newPatientFile);
            return new Response();
        }

        public async Task<FileViewModel> DownloadFile(int fileId, int? userId)
        {
            var file = await _patientRepository.GetPatientFileById(fileId, userId);

            if (file == null)
            {
                return null;
            }

            if (!File.Exists(file.Path))
            {
                return null;
            }
            return new FileViewModel()
            {
                File = File.ReadAllBytes(file.Path),
                FileName = file.Name
            };
        }

        public async Task<Response> DeleteFile(int fileId, int? userId)
        {
            var file = await _patientRepository.GetPatientFileById(fileId, userId);

            if (file == null)
            {
                return new Response(false, "Arquivo não encontrado.");
            }

            if (File.Exists(file.Path))
            {
                File.Delete(file.Path);
            }

            await _patientRepository.RemovePatientFile(file);
            return new Response();
        }
    }
}
