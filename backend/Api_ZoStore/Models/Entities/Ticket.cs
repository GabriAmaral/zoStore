using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_ZoStore.Models.Entities
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        public int IdCliente { get; set; }
        public string Assunto { get; set; }
        public int Status { get; set; }
        public int IdProduto { get; set; }
        public DateTime DataAbertura { get; set; }


        [NotMapped]
        public Usuario? Usuario { get; set; }
        [NotMapped]
        public Produto? Produto { get; set; }
    }
}
