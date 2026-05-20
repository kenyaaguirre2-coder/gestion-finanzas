using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestionFinanzas.Models
{

    public class Transaccion
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El tipo es requerido")]
        public string Tipo { get; set; } = string.Empty; // "Ingreso" o "Gasto"

        [Required(ErrorMessage = "La categoría es requerida")]
        public string Categoria { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "El monto debe ser mayor a 0")]
        public decimal Monto { get; set; }

        [MaxLength(200)]
        public string Descripcion { get; set; } = string.Empty;

        [Required]
        public DateTime Fecha { get; set; } = DateTime.Now;

        // Campos adicionales para el usuario (futuro)
        public int? UsuarioId { get; set; }
    }
}