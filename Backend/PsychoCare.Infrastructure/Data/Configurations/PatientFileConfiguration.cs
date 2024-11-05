using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Configurations
{
    public class PatientFileConfiguration : IEntityTypeConfiguration<PatientFile>
    {
        public void Configure(EntityTypeBuilder<PatientFile> builder)
        {
            builder.HasKey(pf => pf.Id);
            builder.Property(pf => pf.Name).IsRequired().HasMaxLength(1023);
            builder.Property(pf => pf.Path).IsRequired().HasMaxLength(2047);
            builder.Property(pf => pf.Date).IsRequired();
            builder.HasOne(pf => pf.Patient).WithMany(p => p.Files).HasForeignKey(pf => pf.PatientId).IsRequired();
        }
    }
}
