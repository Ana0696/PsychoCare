using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PsychoCare.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AppointmentDisable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Disabled",
                table: "Appointments",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Disabled",
                table: "Appointments");
        }
    }
}
