using PsychoCare.Core.Entities;

namespace PsychoCare.Core.Interfaces
{
    public interface IScreeningRepository
    {
        Task<int> RegisterScreening(Screening newScreening);
        Task<IEnumerable<Screening>> GetList();
        Task<Screening?> GetById(int id);
        Task EditScreening(Screening screening);
    }
}
