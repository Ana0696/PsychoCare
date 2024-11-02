namespace PsychoCare.Application.InputModels.Room
{
    public class RegisterRoomInputModel
    {
        public string Name { get; set; }
        public bool AllowGroupSession { get; set; }
        public bool SpecialNeeds { get; set; }
        public bool Pediatric { get; set; }
    }
}
