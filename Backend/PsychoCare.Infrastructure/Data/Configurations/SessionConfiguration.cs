using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Configurations
{
    public class SessionConfiguration : IEntityTypeConfiguration<Session>
    {
        public void Configure(EntityTypeBuilder<Session> builder)
        {
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Evolution);
            builder.Property(s => s.Observation);
            builder.Property(s => s.Date).IsRequired();
            builder.HasOne(s => s.Patient).WithMany(p => p.Sessions).HasForeignKey(u => u.PatientId).IsRequired();
            builder.HasOne(s => s.User).WithMany(u => u.Sessions).HasForeignKey(u => u.UserId).IsRequired();
            builder.HasOne(s => s.Room).WithMany(r => r.Sessions).HasForeignKey(u => u.RoomId).IsRequired();
            builder.HasOne(s => s.Appointment).WithOne(a => a.Session).HasForeignKey<Session>(a => a.AppointmentId).IsRequired();
        }
    }
}
