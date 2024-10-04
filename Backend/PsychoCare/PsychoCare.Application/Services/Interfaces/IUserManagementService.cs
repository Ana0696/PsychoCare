using PsychoCare.Application.InputModels;

namespace PsychoCare.Application.Services.Interfaces
{
    public interface IUserManagementService
    {
        bool Register(UserInputModel newUser);
        bool EditById(UserInputModel newEdit, int id);
    }
}