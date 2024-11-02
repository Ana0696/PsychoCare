using PsychoCare.Application.InputModels.Room;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Room;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IRoomService
    {
        Task<Response> Register(RegisterRoomInputModel request);
        Task<Response<IEnumerable<RoomViewModel>>> GetList();
        Task<Response<RoomViewModel>> GetById(int id);
        Task<Response> EditById(int id, RegisterRoomInputModel request);
        Task<Response> DisableById(int id);
    }
}
