using PsychoCare.Core.Entities;

namespace PsychoCare.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByEmailAsync(string email);
    }
}
