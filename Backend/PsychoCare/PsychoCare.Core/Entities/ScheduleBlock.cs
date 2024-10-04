namespace PsychoCare.Core.Entities
{
    public class ScheduleBlock : BaseEntity
    {
        public TimeSpan StartTime { get; private set; }
        public TimeSpan EndTime { get; private set; }
        public DayOfWeek WeekDay { get; private set; }
        public int UserId { get; private set; }
        public string Observation { get; private set; }

        public virtual User User { get; set; }

        public ScheduleBlock(TimeSpan startTime, TimeSpan endTime, DayOfWeek weekDay, int userId, string observation)
        {
            StartTime = startTime;
            EndTime = endTime;
            WeekDay = weekDay;
            UserId = userId;
            Observation = observation;
        }



        //public void Edit
    }
}
