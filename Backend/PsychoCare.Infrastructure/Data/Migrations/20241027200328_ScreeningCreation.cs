using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PsychoCare.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ScreeningCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Genre",
                table: "Users",
                newName: "Gender");

            migrationBuilder.AddColumn<int>(
                name: "SupervisorId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Screenings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BirthDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Gender = table.Column<string>(type: "varchar(31)", maxLength: 31, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(127)", maxLength: 127, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Urgency = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SpecialNeeds = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Observation = table.Column<string>(type: "varchar(1023)", maxLength: 1023, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContactDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Disabled = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Screenings", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SupervisorId",
                table: "Users",
                column: "SupervisorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_SupervisorId",
                table: "Users",
                column: "SupervisorId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_SupervisorId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Screenings");

            migrationBuilder.DropIndex(
                name: "IX_Users_SupervisorId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SupervisorId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "Users",
                newName: "Genre");
        }
    }
}
