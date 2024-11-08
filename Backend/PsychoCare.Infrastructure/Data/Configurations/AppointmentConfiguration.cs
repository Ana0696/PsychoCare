using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Configurations
{
    public class AppointmentConfiguration : IEntityTypeConfiguration<Appointment>
    {
        public void Configure(EntityTypeBuilder<Appointment> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.StartDate).IsRequired();
            builder.Property(a => a.EndDate).IsRequired();
            builder.Property(a => a.Urgency).IsRequired();
            builder.Property(a => a.SpecialNeeds).IsRequired();
            builder.Property(a => a.PatientAttendance);
            builder.Property(a => a.UserAttendance);
            builder.HasOne(a => a.Patient).WithMany(p => p.Appointments).HasForeignKey(a => a.PatientId).IsRequired();
            builder.HasOne(a => a.User).WithMany(u => u.Appointments).HasForeignKey(a => a.UserId).IsRequired();
            builder.HasOne(a => a.Room).WithMany(r => r.Appointments).HasForeignKey(a => a.RoomId).IsRequired();
        }
    }
}
