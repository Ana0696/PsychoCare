using PsychoCare.Application.InputModels.Room;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels;
using PsychoCare.Application.ViewModels.Room;
using PsychoCare.Core.Entities;
using PsychoCare.Core.Interfaces;

namespace PsychoCare.Application.Services.Implementations
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;

        public RoomService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public async Task<Response> Register(RegisterRoomInputModel request)
        {
            Room newRoom = new Room(request.Name, request.AllowGroupSession, request.SpecialNeeds, request.Pediatric, request.IsActive);

            await _roomRepository.RegisterRoom(newRoom);
            return new Response();
        }

        public async Task<Response<IEnumerable<RoomViewModel>>> GetList()
        {
            var list = await _roomRepository.GetList();

            return new Response<IEnumerable<RoomViewModel>>(list.Select(r =>
                new RoomViewModel()
                {
                    Id = r.Id,
                    Name = r.Name,
                    AllowGroupSession = r.AllowGroupSession,
                    SpecialNeeds = r.SpecialNeeds,
                    Pediatric = r.Pediatric,
                    IsActive = r.IsActive
                }
            ));
        }

        public async Task<Response<RoomViewModel>> GetById(int id)
        {
            var room = await _roomRepository.GetById(id);

            if (room == null)
            {
                return new Response<RoomViewModel>(false, "Sala não encontrada.");
            }

            var roomVm = new RoomViewModel()
            {
                Id = room.Id,
                Name = room.Name,
                AllowGroupSession = room.AllowGroupSession,
                SpecialNeeds = room.SpecialNeeds,
                Pediatric = room.Pediatric,
                IsActive = room.IsActive
            };

            return new Response<RoomViewModel>(roomVm);
        }

        public async Task<Response> EditById(int id, RegisterRoomInputModel request)
        {
            var room = await _roomRepository.GetById(id);

            if (room == null)
            {
                return new Response(false, "Sala não encontrada.");
            }

            room.EditRoom(request.Name, request.AllowGroupSession, request.SpecialNeeds, request.Pediatric, request.IsActive);

            await _roomRepository.EditRoom(room);

            return new Response();
        }
    }
}
