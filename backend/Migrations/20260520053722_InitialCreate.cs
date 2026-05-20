using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transacciones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Categoria = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Monto = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UsuarioId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transacciones", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Transacciones",
                columns: new[] { "Id", "Categoria", "Descripcion", "Fecha", "Monto", "Tipo", "UsuarioId" },
                values: new object[,]
                {
                    { 1, "Salario", "Salario mensual", new DateTime(2026, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 15000m, "Ingreso", null },
                    { 2, "Alimentación", "Supermercado", new DateTime(2026, 4, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2500m, "Gasto", null },
                    { 3, "Transporte", "Uber", new DateTime(2026, 4, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 500m, "Gasto", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transacciones");
        }
    }
}
