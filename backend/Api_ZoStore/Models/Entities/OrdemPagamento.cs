using System.ComponentModel.DataAnnotations;

namespace Api_ZoStore.Models.Entities
{
    public class OrdemPagamento
    {
        [Key]
        public int IdPedido { get; set; }
        public int Status { get; set; }
        public float Valor { get; set; }
    }
}
