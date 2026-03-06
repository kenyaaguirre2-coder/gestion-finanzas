namespace GestionFinanzas.Models;

public class Transaccion
{
    public int Id { get; set; }
    public string Tipo { get; set; } = string.Empty; // Ingreso o Gasto
    public string Categoria { get; set; } = string.Empty;
    public decimal Monto { get; set; }
    public string Descripcion { get; set; } = string.Empty;
    public DateTime Fecha { get; set; }
}