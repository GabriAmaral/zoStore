using System.ComponentModel.DataAnnotations;

namespace Api_ZoStore.Models.Entities
{
    public class Produto
    {
        [Key]
        public int Id { get; set; }
        public string Descricao { get; set; }
        public float Valor { get; set; }
    }
}
