using GestionFinanzas.DTOs;

namespace GestionFinanzas.Services
{
    public interface ITransaccionService
    {
        Task<IEnumerable<TransaccionDTO>> GetAllAsync();
        Task<TransaccionDTO?> GetByIdAsync(int id);
        Task<TransaccionDTO> CreateAsync(CrearTransaccionDTO crearDto);
        Task<TransaccionDTO?> UpdateAsync(int id, CrearTransaccionDTO actualizarDto);
        Task<bool> DeleteAsync(int id);
    }
}