namespace PsychoCare.Application.ViewModels.Room
{
    public class RoomViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool AllowGroupSession { get; set; }
        public bool SpecialNeeds { get; set; }
        public bool Pediatric { get; set; }
    }
}
