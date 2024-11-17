using PsychoCare.Core.Entities;

namespace PsychoCare.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByEmailAsync(string email);
        Task<bool> CheckEmailExists(string email);
        Task<int> RegisterUser(User newUser);
        Task<IEnumerable<User>> GetList();
        Task<User?> GetById(int id);
        Task RemoveScheduleBlocks(IEnumerable<ScheduleBlock> scheduleBlocks);
        Task EditUser(User user);
        Task<IEnumerable<User>> GetReport(bool activeOnly, bool underMySupervision, int userId);
    }
}
