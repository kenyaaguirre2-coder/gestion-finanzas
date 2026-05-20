using Microsoft.EntityFrameworkCore;
using GestionFinanzas.Models;

namespace GestionFinanzas.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Transaccion> Transacciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Datos de ejemplo (seed)
            modelBuilder.Entity<Transaccion>().HasData(
                new Transaccion { Id = 1, Tipo = "Ingreso", Categoria = "Salario", Monto = 15000, Descripcion = "Salario mensual", Fecha = new DateTime(2026, 4, 1) },
                new Transaccion { Id = 2, Tipo = "Gasto", Categoria = "Alimentación", Monto = 2500, Descripcion = "Supermercado", Fecha = new DateTime(2026, 4, 2) },
                new Transaccion { Id = 3, Tipo = "Gasto", Categoria = "Transporte", Monto = 500, Descripcion = "Uber", Fecha = new DateTime(2026, 4, 3) }
            );
        }
    }
}