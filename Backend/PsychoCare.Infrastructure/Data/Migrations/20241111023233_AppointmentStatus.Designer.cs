﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PsychoCare.Infrastructure.Data.Context;

#nullable disable

namespace PsychoCare.Infrastructure.Data.Migrations
{
    [DbContext(typeof(PsychoCareDBContext))]
    [Migration("20241111023233_AppointmentStatus")]
    partial class AppointmentStatus
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("PsychoCare.Core.Entities.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Complement")
                        .HasMaxLength(511)
                        .HasColumnType("varchar(511)");

                    b.Property<string>("Neighborhood")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Number")
                        .HasMaxLength(64)
                        .HasColumnType("varchar(64)");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<string>("PostalCode")
                        .HasMaxLength(31)
                        .HasColumnType("varchar(31)");

                    b.Property<string>("State")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Street")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("PatientId")
                        .IsUnique();

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Disabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<bool>("SpecialNeeds")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<bool>("Urgency")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Document")
                        .HasMaxLength(63)
                        .HasColumnType("varchar(63)");

                    b.Property<string>("Email")
                        .HasMaxLength(127)
                        .HasColumnType("varchar(127)");

                    b.Property<string>("Gender")
                        .HasMaxLength(63)
                        .HasColumnType("varchar(63)");

                    b.Property<int>("Group")
                        .HasColumnType("int");

                    b.Property<DateTime?>("GuardianBirthDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("GuardianDocument")
                        .HasMaxLength(63)
                        .HasColumnType("varchar(63)");

                    b.Property<string>("GuardianGender")
                        .HasMaxLength(63)
                        .HasColumnType("varchar(63)");

                    b.Property<string>("GuardianName")
                        .HasMaxLength(1023)
                        .HasColumnType("varchar(1023)");

                    b.Property<string>("GuardianPhoneNumber")
                        .HasMaxLength(31)
                        .HasColumnType("varchar(31)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(1023)
                        .HasColumnType("varchar(1023)");

                    b.Property<string>("Observations")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(31)
                        .HasColumnType("varchar(31)");

                    b.Property<string>("Profession")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<bool>("SpecialNeeds")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.PatientFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(1023)
                        .HasColumnType("varchar(1023)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasMaxLength(2047)
                        .HasColumnType("varchar(2047)");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.ToTable("PatientFiles");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("AllowGroupSession")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(127)
                        .HasColumnType("varchar(127)");

                    b.Property<bool>("Pediatric")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("SpecialNeeds")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.ScheduleBlock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("time(6)");

                    b.Property<string>("Observation")
                        .HasMaxLength(511)
                        .HasColumnType("varchar(511)");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("WeekDay")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ScheduleBlocks");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Screening", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("ContactDate")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Disabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Email")
                        .HasMaxLength(127)
                        .HasColumnType("varchar(127)");

                    b.Property<string>("Gender")
                        .HasMaxLength(31)
                        .HasColumnType("varchar(31)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Observation")
                        .HasMaxLength(1023)
                        .HasColumnType("varchar(1023)");

                    b.Property<int?>("PatientId")
                        .HasColumnType("int");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<bool>("SpecialNeeds")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Urgency")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.ToTable("Screenings");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AppointmentId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Evolution")
                        .HasColumnType("longtext");

                    b.Property<string>("Observation")
                        .HasColumnType("longtext");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AppointmentId")
                        .IsUnique();

                    b.HasIndex("PatientId");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("BirthDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(127)
                        .HasColumnType("varchar(127)");

                    b.Property<string>("Gender")
                        .HasMaxLength(31)
                        .HasColumnType("varchar(31)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(127)
                        .HasColumnType("varchar(127)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(511)
                        .HasColumnType("varchar(511)");

                    b.Property<string>("Period")
                        .HasMaxLength(127)
                        .HasColumnType("varchar(127)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<int?>("SupervisorId")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(127)
                        .HasColumnType("varchar(127)");

                    b.HasKey("Id");

                    b.HasIndex("SupervisorId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Address", b =>
                {
                    b.HasOne("PsychoCare.Core.Entities.Patient", "Patient")
                        .WithOne("Address")
                        .HasForeignKey("PsychoCare.Core.Entities.Address", "PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Appointment", b =>
                {
                    b.HasOne("PsychoCare.Core.Entities.Patient", "Patient")
                        .WithMany("Appointments")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PsychoCare.Core.Entities.Room", "Room")
                        .WithMany("Appointments")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PsychoCare.Core.Entities.User", "User")
                        .WithMany("Appointments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.PatientFile", b =>
                {
                    b.HasOne("PsychoCare.Core.Entities.Patient", "Patient")
                        .WithMany("Files")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.ScheduleBlock", b =>
                {
                    b.HasOne("PsychoCare.Core.Entities.User", "User")
                        .WithMany("ScheduleBlocks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Screening", b =>
                {
                    b.HasOne("PsychoCare.Core.Entities.Patient", "Patient")
                        .WithMany("Screenings")
                        .HasForeignKey("PatientId");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Session", b =>
                {
                    b.HasOne("PsychoCare.Core.Entities.Appointment", "Appointment")
                        .WithOne("Session")
                        .HasForeignKey("PsychoCare.Core.Entities.Session", "AppointmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PsychoCare.Core.Entities.Patient", "Patient")
                        .WithMany("Sessions")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PsychoCare.Core.Entities.Room", "Room")
                        .WithMany("Sessions")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PsychoCare.Core.Entities.User", "User")
                        .WithMany("Sessions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Appointment");

                    b.Navigation("Patient");

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.User", b =>
                {
                    b.HasOne("PsychoCare.Core.Entities.User", "Supervisor")
                        .WithMany("Interns")
                        .HasForeignKey("SupervisorId");

                    b.Navigation("Supervisor");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Appointment", b =>
                {
                    b.Navigation("Session")
                        .IsRequired();
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Patient", b =>
                {
                    b.Navigation("Address")
                        .IsRequired();

                    b.Navigation("Appointments");

                    b.Navigation("Files");

                    b.Navigation("Screenings");

                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.Room", b =>
                {
                    b.Navigation("Appointments");

                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("PsychoCare.Core.Entities.User", b =>
                {
                    b.Navigation("Appointments");

                    b.Navigation("Interns");

                    b.Navigation("ScheduleBlocks");

                    b.Navigation("Sessions");
                });
#pragma warning restore 612, 618
        }
    }
}
