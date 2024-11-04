using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Configurations
{
    public class RoomConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder)
        {
            builder.HasKey(r => r.Id);
            builder.Property(r => r.Name).IsRequired().HasMaxLength(127);
            builder.Property(r => r.AllowGroupSession).IsRequired();
            builder.Property(r => r.SpecialNeeds).IsRequired();
            builder.Property(r => r.Pediatric).IsRequired();
            builder.Property(r => r.IsActive).IsRequired();
        }
    }
}
