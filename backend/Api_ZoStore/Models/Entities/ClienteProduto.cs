using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_ZoStore.Models.Entities
{
    public class ClienteProduto
    {
        [Column(Order = 0), Key]
        public int IdCliente { get; set; }
        [Column(Order = 1), Key]
        public int IdProduto { get; set; }
    }
}
