using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PsychoCare.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AppointmentStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PatientAttendance",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "UserAttendance",
                table: "Appointments");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Appointments");

            migrationBuilder.AddColumn<bool>(
                name: "PatientAttendance",
                table: "Appointments",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "UserAttendance",
                table: "Appointments",
                type: "tinyint(1)",
                nullable: true);
        }
    }
}
