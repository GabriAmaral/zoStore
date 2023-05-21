using Api_ZoStore.Models.DataBase;
using Api_ZoStore.Models.Entities;
using Api_ZoStore.Repositories.Base;
using Api_ZoStore.Repositories.Interface;

namespace Api_ZoStore.Repositories.Implantation
{
    public class ChatTicketMessagesRepository : BaseRepository<ChatTicketMessages, int>, IChatTicketMessagesRepository
    {
        public ChatTicketMessagesRepository(DataBaseContext _db) : base(_db)
        {
        }
    }
}
