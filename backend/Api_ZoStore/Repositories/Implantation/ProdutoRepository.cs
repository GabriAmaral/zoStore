using Api_ZoStore.Models.DataBase;
using Api_ZoStore.Models.Entities;
using Api_ZoStore.Repositories.Base;
using Api_ZoStore.Repositories.Interface;

namespace Api_ZoStore.Repositories.Implantation
{
    public class ProdutoRepository : BaseRepository<Produto, int>, IProdutoRepository
    {
        public ProdutoRepository(DataBaseContext _db) : base(_db)
        {
        }
    }
}
