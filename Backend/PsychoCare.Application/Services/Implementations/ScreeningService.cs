using PsychoCare.Application.InputModels.Screening;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Screening;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Interfaces;

namespace PsychoCare.Application.Services.Implementations
{
    public class ScreeningService : IScreeningService
    {
        private readonly IScreeningRepository _screeningRepository;

        public ScreeningService(IScreeningRepository screeningRepository)
        {
            _screeningRepository = screeningRepository;
        }

        public async Task<Response> Register(RegisterScreeningInputModel request)
        {
            Screening newScreening = new Screening(request.Name, request.BirthDate, request.Gender, request.PhoneNumber, request.Email, request.Urgency, request.SpecialNeeds, request.Observation, request.PatientId);

            await _screeningRepository.RegisterScreening(newScreening);
            return new Response();
        }

        public async Task<Response<IEnumerable<ScreeningListViewModel>>> GetList()
        {
            var list = await _screeningRepository.GetList();

            return new Response<IEnumerable<ScreeningListViewModel>>(list.Select(s =>
                new ScreeningListViewModel()
                {
                    Id = s.Id,
                    Name = s.Name,
                    BirthDate = s.BirthDate,
                    PhoneNumber = s.PhoneNumber,
                    Urgency = s.Urgency,
                    SpecialNeeds = s.SpecialNeeds,
                    ContactDate = s.ContactDate
                }
            ));
        }

        public async Task<Response<ScreeningViewModel>> GetById(int id)
        {
            var screening = await _screeningRepository.GetById(id);

            if (screening == null)
            {
                return new Response<ScreeningViewModel>(false, "Usuário não encontrado.");
            }

            var screeningVm = new ScreeningViewModel()
            {
                Id = screening.Id,
                Name = screening.Name,
                BirthDate = screening.BirthDate,
                Gender = screening.Gender,
                Email = screening.Email,
                PhoneNumber = screening.PhoneNumber,
                Urgency = screening.Urgency,
                SpecialNeeds = screening.SpecialNeeds,
                Observation = screening.Observation,
                PatientId = screening.PatientId
            };

            return new Response<ScreeningViewModel>(screeningVm);
        }

        public async Task<Response> EditById(int id, EditScreeningInputModel request)
        {
            var screening = await _screeningRepository.GetById(id);

            if (screening == null)
            {
                return new Response(false, "Triagem não encontrada.");
            }

            screening.EditScreening(request.Name, request.BirthDate, request.Gender, request.PhoneNumber,
                request.Email, request.Urgency, request.SpecialNeeds, request.Observation, request.PatientId);

            await _screeningRepository.EditScreening(screening);

            return new Response();
        }

        public async Task<Response> DisableById(int id)
        {
            var screening = await _screeningRepository.GetById(id);

            if (screening == null)
            {
                return new Response(false, "Triagem não encontrada.");
            }

            screening.DisableScreening();

            await _screeningRepository.EditScreening(screening);

            return new Response();
        }
    }
}
