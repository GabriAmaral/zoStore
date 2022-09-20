using Api_ZoStore.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api_ZoStore.Models.DataBase
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Pedido> Pedido { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<ItensPedido> ItensPedido { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<OrdemPagamento> OrdemPgto { get; set; }

    }
}
