using System.ComponentModel.DataAnnotations;

namespace Api_ZoStore.Models.Entities
{
    public class ChatTicketMessages
    {
        [Key]
        public int Id { get; set; }
        public int IdTicket { get; set; }
        public int IdRemetente { get; set; }
        public string Mensagem { get; set; }
    }
}
