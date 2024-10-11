﻿using PsychoCare.Core.Entities.Enums;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PsychoCare.Application.ViewModels.UserManagement
{
    public class UserListViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
    }
}