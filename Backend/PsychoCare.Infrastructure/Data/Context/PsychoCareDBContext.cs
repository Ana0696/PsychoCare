﻿using Microsoft.EntityFrameworkCore;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Context
{
    public class PsychoCareDBContext : DbContext
    {
        public PsychoCareDBContext(DbContextOptions<PsychoCareDBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<ScheduleBlock> ScheduleBlocks { get; set; }
        public DbSet<Screening> Screenings { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<PatientFile> PatientFiles { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PsychoCareDBContext).Assembly);
        }
    }
}
