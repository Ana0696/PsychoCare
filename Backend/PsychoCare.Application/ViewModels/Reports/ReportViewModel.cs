namespace PsychoCare.Application.ViewModels.Reports
{
    public class ReportViewModel
    {
        public int Id { get; set; }
        public string InternName { get; set; }
        public string? InternPeriod { get; set; }
        public string SupervisorName { get; set; }
        public int CompletedAppointment { get; set; }
        public TimeSpan AppointmentHours { get; set; }
    }
}
