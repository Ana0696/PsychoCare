using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Configurations
{
    public class UsersConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Name).IsRequired().HasMaxLength(127);
            builder.Property(u => u.Surname).IsRequired().HasMaxLength(127);
            builder.Property(u => u.BirthDate);
            builder.Property(u => u.Genre).HasMaxLength(31);
            builder.Property(u => u.PhoneNumber).IsRequired().HasMaxLength(15);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(127);
            builder.Property(u => u.Period).HasMaxLength(127);
            builder.Property(u => u.Password).IsRequired().HasMaxLength(511);
            builder.Property(u => u.Role).IsRequired();
            builder.Property(u => u.IsActive).IsRequired();
        }
    }
}
