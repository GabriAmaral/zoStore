using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_ZoStore.Models.Entities
{
    public class ChatTicketMessages
    {
        [Key]
        public int Id { get; set; }
        public int IdTicket { get; set; }
        public int IdRemetente { get; set; }
        public string Mensagem { get; set; }

        [NotMapped]
        public Usuario? Usuario { get; set; }
    }
}
