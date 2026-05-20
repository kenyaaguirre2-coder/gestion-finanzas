using System.ComponentModel.DataAnnotations;

namespace GestionFinanzas.DTOs
{
    public class TransaccionDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El tipo es requerido")]
        public string Tipo { get; set; } = string.Empty;

        [Required(ErrorMessage = "La categoría es requerida")]
        public string Categoria { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Monto { get; set; }

        public string Descripcion { get; set; } = string.Empty;

        public DateTime Fecha { get; set; }
    }

    public class CrearTransaccionDTO
    {
        [Required]
        public string Tipo { get; set; } = string.Empty;

        [Required]
        public string Categoria { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Monto { get; set; }

        public string Descripcion { get; set; } = string.Empty;

        public DateTime Fecha { get; set; } = DateTime.Now;
    }
}