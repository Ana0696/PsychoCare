namespace PsychoCare.Application.ViewModels.Patient
{
    public class SessionListViewModel
    {
        public int Id { get; set; }
        public string ProfessionalName { get; set; }
        public string RoomName { get; set; }
        public string? Evolution { get; set; }
        public string? Observation { get; set; }
        public DateTime Date { get; set; }
    }
}
