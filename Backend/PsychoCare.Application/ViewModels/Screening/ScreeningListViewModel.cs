namespace PsychoCare.Application.ViewModels.Screening
{
    public class ScreeningListViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public bool Urgency { get; set; }
        public bool SpecialNeeds { get; set; }
        public DateTime ContactDate { get; set; }
    }
}
