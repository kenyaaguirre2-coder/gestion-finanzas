using Microsoft.AspNetCore.Mvc;
using GestionFinanzas.DTOs;
using GestionFinanzas.Services;

namespace GestionFinanzas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransaccionesController : ControllerBase
    {
        private readonly ITransaccionService _transaccionService;

        public TransaccionesController(ITransaccionService transaccionService)
        {
            _transaccionService = transaccionService;
        }

        // GET: api/transacciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransaccionDTO>>> GetTransacciones()
        {
            try
            {
                var transacciones = await _transaccionService.GetAllAsync();
                return Ok(transacciones);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        // GET: api/transacciones/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TransaccionDTO>> GetTransaccion(int id)
        {
            try
            {
                var transaccion = await _transaccionService.GetByIdAsync(id);
                if (transaccion == null)
                {
                    return NotFound($"No se encontró la transacción con ID {id}");
                }
                return Ok(transaccion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        // POST: api/transacciones
        [HttpPost]
        public async Task<ActionResult<TransaccionDTO>> CreateTransaccion(CrearTransaccionDTO crearDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var transaccion = await _transaccionService.CreateAsync(crearDto);
                return CreatedAtAction(nameof(GetTransaccion), new { id = transaccion.Id }, transaccion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        // PUT: api/transacciones/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaccion(int id, CrearTransaccionDTO actualizarDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var transaccionActualizada = await _transaccionService.UpdateAsync(id, actualizarDto);
                if (transaccionActualizada == null)
                {
                    return NotFound($"No se encontró la transacción con ID {id}");
                }

                return Ok(transaccionActualizada);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        // DELETE: api/transacciones/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaccion(int id)
        {
            try
            {
                var eliminado = await _transaccionService.DeleteAsync(id);
                if (!eliminado)
                {
                    return NotFound($"No se encontró la transacción con ID {id}");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }
    }
}