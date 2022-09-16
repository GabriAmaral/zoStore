using System.ComponentModel.DataAnnotations;

namespace Api_ZoStore.Models.Entities
{
    public class ItensPedido
    {
        [Key]
        public int IdPedido { get; set; }
        public int IdProduto { get; set; }


    }
}
