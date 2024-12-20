﻿namespace PsychoCare.Core.Entities
{
    public class Screening : BaseEntity
    {
        public string Name { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string? Gender { get; private set; }
        public string PhoneNumber { get; private set; }
        public string? Email { get; private set; }
        public bool Urgency { get; private set; }
        public bool SpecialNeeds { get; private set; }
        public string? Observation { get; private set; }
        public DateTime ContactDate { get; private set; } = DateTime.Now;
        public bool Disabled {  get; private set; } = false;
        public int? PatientId { get; set; }

        public virtual Patient Patient { get; set; }

        public Screening() { }

        public Screening(string name, DateTime birthDate, string? gender, string phoneNumber, string? email, bool urgency, bool specialNeeds, string? observation, int? patientId)
        {
            Name = name;
            BirthDate = birthDate;
            Gender = gender;
            PhoneNumber = phoneNumber;
            Email = email;
            Urgency = urgency;
            SpecialNeeds = specialNeeds;
            Observation = observation;
            PatientId = patientId;
        }

        public void EditScreening(string name, DateTime birthDate, string? gender, string phoneNumber, string? email, bool urgency, bool specialNeeds, string? observation, int? patientId)
        {
            Name = name;
            BirthDate = birthDate;
            Gender = gender;
            PhoneNumber = phoneNumber;
            Email = email;
            Urgency = urgency;
            SpecialNeeds = specialNeeds;
            Observation = observation;
            PatientId = patientId;
        }

        public void DisableScreening()
        {
            Disabled = true;
        }
    }
}
