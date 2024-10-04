using Microsoft.EntityFrameworkCore;
using PsychoCare.Core.Entities;

namespace PsychoCare.Infrastructure.Data.Context
{
    public class PsychoCareDBContext : DbContext
    {
        public PsychoCareDBContext(DbContextOptions<PsychoCareDBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<ScheduleBlock> ScheduleBlocks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PsychoCareDBContext).Assembly);
        }
    }
}
