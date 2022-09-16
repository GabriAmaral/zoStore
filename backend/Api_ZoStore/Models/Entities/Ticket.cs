using System.ComponentModel.DataAnnotations;

namespace Api_ZoStore.Models.Entities
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        public int IdCliente { get; set; }
        public int IdFuncionario { get; set; }
        public string Descricao { get; set; }
        public int Status { get; set; }

    }
}
