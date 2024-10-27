using PsychoCare.Application.InputModels.Screening;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Screening;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IScreeningService
    {
        Task<Response> Register(RegisterScreeningInputModel request);
        Task<Response<IEnumerable<ScreeningListViewModel>>> GetList();
        Task<Response<ScreeningViewModel>> GetById(int id);
        Task<Response> EditById(int id, EditScreeningInputModel request);
        Task<Response> DisableById(int id);
    }
}
