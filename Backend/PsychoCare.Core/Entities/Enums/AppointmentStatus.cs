namespace PsychoCare.Core.Entities.Enums
{
    public enum AppointmentStatus
    {
        Waiting = 0,
        Confirmed,
        BothAttended,
        PatientOnlyAttended,
        ProfessionalOnlyAttended,
        NoneAttended
    }
}
