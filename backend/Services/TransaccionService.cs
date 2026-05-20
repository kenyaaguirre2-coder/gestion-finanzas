using Microsoft.EntityFrameworkCore;
using GestionFinanzas.Data;
using GestionFinanzas.Models;
using GestionFinanzas.DTOs;

namespace GestionFinanzas.Services
{
    public class TransaccionService : ITransaccionService
    {
        private readonly ApplicationDbContext _context;

        public TransaccionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TransaccionDTO>> GetAllAsync()
        {
            var transacciones = await _context.Transacciones.ToListAsync();
            return transacciones.Select(t => new TransaccionDTO
            {
                Id = t.Id,
                Tipo = t.Tipo,
                Categoria = t.Categoria,
                Monto = t.Monto,
                Descripcion = t.Descripcion,
                Fecha = t.Fecha
            });
        }

        public async Task<TransaccionDTO?> GetByIdAsync(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);
            if (transaccion == null) return null;

            return new TransaccionDTO
            {
                Id = transaccion.Id,
                Tipo = transaccion.Tipo,
                Categoria = transaccion.Categoria,
                Monto = transaccion.Monto,
                Descripcion = transaccion.Descripcion,
                Fecha = transaccion.Fecha
            };
        }

        public async Task<TransaccionDTO> CreateAsync(CrearTransaccionDTO crearDto)
        {
            var transaccion = new Transaccion
            {
                Tipo = crearDto.Tipo,
                Categoria = crearDto.Categoria,
                Monto = crearDto.Monto,
                Descripcion = crearDto.Descripcion,
                Fecha = crearDto.Fecha
            };

            _context.Transacciones.Add(transaccion);
            await _context.SaveChangesAsync();

            return new TransaccionDTO
            {
                Id = transaccion.Id,
                Tipo = transaccion.Tipo,
                Categoria = transaccion.Categoria,
                Monto = transaccion.Monto,
                Descripcion = transaccion.Descripcion,
                Fecha = transaccion.Fecha
            };
        }

        public async Task<TransaccionDTO?> UpdateAsync(int id, CrearTransaccionDTO actualizarDto)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);
            if (transaccion == null) return null;

            transaccion.Tipo = actualizarDto.Tipo;
            transaccion.Categoria = actualizarDto.Categoria;
            transaccion.Monto = actualizarDto.Monto;
            transaccion.Descripcion = actualizarDto.Descripcion;
            transaccion.Fecha = actualizarDto.Fecha;

            await _context.SaveChangesAsync();

            return new TransaccionDTO
            {
                Id = transaccion.Id,
                Tipo = transaccion.Tipo,
                Categoria = transaccion.Categoria,
                Monto = transaccion.Monto,
                Descripcion = transaccion.Descripcion,
                Fecha = transaccion.Fecha
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);
            if (transaccion == null) return false;

            _context.Transacciones.Remove(transaccion);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}