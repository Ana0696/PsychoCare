using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Configurations
{
    public class ScheduleBlockConfiguration : IEntityTypeConfiguration<ScheduleBlock>
    {
        public void Configure(EntityTypeBuilder<ScheduleBlock> builder)
        {
            builder.HasKey(sb => sb.Id);
            builder.Property(sb => sb.StartTime).IsRequired();
            builder.Property(sb => sb.EndTime).IsRequired();
            builder.Property(sb => sb.WeekDay).IsRequired();
            builder.Property(sb => sb.Observation).HasMaxLength(511);
            builder.HasOne(sb => sb.User).WithMany(u => u.ScheduleBlocks).HasForeignKey(sb => sb.UserId).IsRequired();
        }
    }
}
