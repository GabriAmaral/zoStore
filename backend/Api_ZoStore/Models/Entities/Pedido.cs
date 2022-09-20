using System.ComponentModel.DataAnnotations;

namespace Api_ZoStore.Models.Entities
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }
        public int IdCliente { get; set; }
        public int IdFuncionario { get; set; }
        public int Status { get; set; }

    }
}
