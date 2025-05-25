using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class TransferUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SenderUserId",
                table: "Transfers",
                newName: "SenderAccountId");

            migrationBuilder.RenameColumn(
                name: "RecipientUserId",
                table: "Transfers",
                newName: "RecipientAccountId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SenderAccountId",
                table: "Transfers",
                newName: "SenderUserId");

            migrationBuilder.RenameColumn(
                name: "RecipientAccountId",
                table: "Transfers",
                newName: "RecipientUserId");
        }
    }
}
