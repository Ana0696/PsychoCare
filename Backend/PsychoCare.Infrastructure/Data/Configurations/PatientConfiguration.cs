using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Configurations
{
    public class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name).IsRequired().HasMaxLength(1023);
            builder.Property(p => p.Group).IsRequired();
            builder.Property(p => p.BirthDate).IsRequired();
            builder.Property(p => p.PhoneNumber).IsRequired().HasMaxLength(31);
            builder.Property(p => p.SpecialNeeds).IsRequired();
            builder.Property(p => p.Email).HasMaxLength(127);
            builder.Property(p => p.Document).HasMaxLength(63);
            builder.Property(p => p.Gender).HasMaxLength(63);
            builder.Property(p => p.Observations);
            builder.Property(p => p.Profession).HasMaxLength(255);
            builder.Property(p => p.GuardianName).HasMaxLength(1023);
            builder.Property(p => p.GuardianBirthDate);
            builder.Property(p => p.GuardianPhoneNumber).HasMaxLength(31);
            builder.Property(p => p.GuardianDocument).HasMaxLength(63);
            builder.Property(p => p.GuardianGender).HasMaxLength(63);
        }
    }
}
