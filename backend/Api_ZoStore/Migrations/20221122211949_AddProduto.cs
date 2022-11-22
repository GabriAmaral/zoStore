using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api_ZoStore.Migrations
{
    public partial class AddProduto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Cdn",
                table: "Produto",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cdn",
                table: "Produto");
        }
    }
}
