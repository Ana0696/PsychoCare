using PsychoCare.Application.InputModels.Appointment;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Appointment;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Entities.Enums;
using PsychoCare.Core.Interfaces;

namespace PsychoCare.Application.Services.Implementations
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;
        public readonly IPatientRepository _patientRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository, IPatientRepository patientRepository)
        {
            _appointmentRepository = appointmentRepository;
            _patientRepository = patientRepository;
        }

        public async Task<Response> Register(int userId, RegisterAppointmentInputModel request)
        {
            bool freeSlot = await _appointmentRepository.FreeSlot(request.RoomId, userId, request.StartDate, request.EndDate);

            if (freeSlot == false)
            {
                return new Response(false, "Horário indisponível.");
            }

            int patientId = 0;

            if (request.PatientId != null && request.PatientId > 0)
            {
                patientId = request.PatientId ?? 0;
            }
            else
            {
                Patient newPatient = new Patient(request.PatientName, request.PatientGroup ?? PatientGroup.Teenager,
                    request.PatientBirthDate ?? DateTime.MinValue, request.PatientPhoneNumber, request.SpecialNeeds);
                patientId = await _patientRepository.RegisterPatient(newPatient);
            }

            Appointment newAppointment = new Appointment(patientId, userId, request.RoomId,
                request.StartDate, request.EndDate, request.Urgency, request.SpecialNeeds);
            await _appointmentRepository.RegisterAppointment(newAppointment);

            return new Response();
        }

        public async Task<Response<IEnumerable<AppointmentViewModel>>> GetList(int? userId)
        {
            var list = await _appointmentRepository.GetList();

            return new Response<IEnumerable<AppointmentViewModel>>(list.Select(a =>
                new AppointmentViewModel()
                {
                    Id = userId == null || userId == a.UserId ? a.Id : null,
                    PatientId = userId == null || userId == a.UserId ? a.PatientId : null,
                    PatientName = userId == null || userId == a.UserId ? a.Patient.Name : null,
                    RoomId = a.RoomId,
                    RoomName = a.Room.Name,
                    UserId = userId == null || userId == a.UserId ? a.UserId : null,
                    UserName = userId == null || userId == a.UserId ? a.User.Name : null,
                    StartDate = a.StartDate,
                    EndDate = a.EndDate,
                    SpecialNeeds = userId == null || userId == a.UserId ? a.SpecialNeeds : null,
                    Urgency = userId == null || userId == a.UserId ? a.Urgency : null,
                    Status = userId == null || userId == a.UserId ? a.Status : null,
                }
            ));
        }

        public async Task<Response> DisableById(int id)
        {
            var appointment = await _appointmentRepository.GetById(id);

            if (appointment == null)
            {
                return new Response(false, "Agendamento não encontrado.");
            }

            appointment.DisableAppointment();

            await _appointmentRepository.EditAppointment(appointment);

            return new Response();
        }

        public async Task<Response> EditDateById(int id, EditDateAppointmentInputModel request)
        {
            var appointment = await _appointmentRepository.GetById(id);

            if (appointment == null)
            {
                return new Response(false, "Agendamento não encontrado.");
            }

            appointment.EditDate(request.StartDate, request.EndDate);

            await _appointmentRepository.EditAppointment(appointment);

            return new Response();
        }

        public async Task<Response> EditStatusById(int id, EditStatusAppointmentInputModel request)
        {
            var appointment = await _appointmentRepository.GetById(id);

            if (appointment == null)
            {
                return new Response(false, "Agendamento não encontrado.");
            }

            appointment.EditStatus(request.Status);

            await _appointmentRepository.EditAppointment(appointment);

            return new Response();
        }

        public async Task<Response<SessionViewModel>> GetSessionByAppointmentId(int id)
        {
            var session = await _appointmentRepository.GetSessionByAppointmentId(id);

            if (session == null)
            {
                return new Response<SessionViewModel>(false, "Sessão não existe.");
            }

            return new Response<SessionViewModel>(new SessionViewModel()
            {
                Id = session.Id,
                Evolution = session.Evolution,
                Observation = session.Observation
            });
        }

        public async Task<Response> RegisterSessionByAppointmentId(int id, RegisterSessionInputModel request)
        {
            var session = await _appointmentRepository.GetSessionByAppointmentId(id);

            if (session == null)
            {
                var appointment = await _appointmentRepository.GetById(id);

                if (appointment == null)
                {
                    return new Response(false, "Agendamento não encontrado.");
                }

                session = new Session(appointment.PatientId, appointment.UserId, appointment.RoomId, request.Evolution, request.Observation, appointment.Id);
                await _appointmentRepository.RegisterSession(session);

                return new Response();
            }
            else
            {
                session.EditSession(request.Evolution, request.Observation);
                await _appointmentRepository.EditSession(session);

                return new Response();
            }
        }
    }
}
