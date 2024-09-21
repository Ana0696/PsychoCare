using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PsychoCare.Application.InputModels.Auth;
using PsychoCare.Application.Services.Interfaces;
using PsychoCare.Application.ViewModels.Auth;
using PsychoCare.Core.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PsychoCare.Application.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<LoginResponse> Login(LoginInputModel request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return null;
            }

            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var tokenOptions = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(jwtSettings["ExpiryMinutes"])),
                signingCredentials: signingCredentials
            );

            return new LoginResponse()
            {
                Name = user.Name,
                Surname = user.Email,
                Email = user.Email,
                Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions),
                Role = user.Role,
            };
        }
    }
}
