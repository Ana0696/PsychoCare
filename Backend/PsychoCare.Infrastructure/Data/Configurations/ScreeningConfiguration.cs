using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Configurations
{
    public class ScreeningConfiguration : IEntityTypeConfiguration<Screening>
    {
        public void Configure(EntityTypeBuilder<Screening> builder)
        {
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
            builder.Property(s => s.BirthDate).IsRequired();
            builder.Property(s => s.Gender).HasMaxLength(31);
            builder.Property(s => s.PhoneNumber).IsRequired().HasMaxLength(15);
            builder.Property(s=> s.Email).HasMaxLength(127);
            builder.Property(s => s.Urgency).IsRequired();
            builder.Property(s => s.SpecialNeeds).IsRequired();
            builder.Property(s => s.Observation).HasMaxLength(1023);
            builder.Property(s => s.ContactDate).IsRequired();
            builder.Property(s => s.Disabled).IsRequired();
        }
    }
}
