﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api_ZoStore.Migrations
{
    public partial class addDescricaoTicket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Ticket",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Ticket");
        }
    }
}
