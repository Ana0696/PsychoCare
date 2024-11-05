using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Configurations
{
    public class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.Street).HasMaxLength(255);
            builder.Property(a => a.Number).HasMaxLength(64);
            builder.Property(a => a.Complement).HasMaxLength(511);
            builder.Property(a => a.Neighborhood).HasMaxLength(255);
            builder.Property(a => a.City).HasMaxLength(255);
            builder.Property(a => a.State).HasMaxLength(255);
            builder.Property(a => a.PostalCode).HasMaxLength(31);
            builder.HasOne(a => a.Patient).WithOne(p => p.Address).HasForeignKey<Address>(a => a.PatientId).IsRequired();
        }
    }
}
