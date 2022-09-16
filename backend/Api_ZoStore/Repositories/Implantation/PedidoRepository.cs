using Api_ZoStore.Models.DataBase;
using Api_ZoStore.Models.Entities;
using Api_ZoStore.Repositories.Base;
using Api_ZoStore.Repositories.Interface;

namespace Api_ZoStore.Repositories.Implantation
{
    public class PedidoRepository : BaseRepository<Pedido, int>, IPedidoRepository
    {
        public PedidoRepository(DataBaseContext _db) : base(_db)
        {
        }
    }
}
