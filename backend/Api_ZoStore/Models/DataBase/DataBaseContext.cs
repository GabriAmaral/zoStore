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

            builder.Entity<ClienteProduto>()
              .HasKey(m => new { m.IdCliente, m.IdProduto });
        }

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Pedido> Pedido { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<ItensPedido> ItensPedido { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<ChatTicketMessages> ChatTicketMessages { get; set; }
        public DbSet<OrdemPagamento> OrdemPgto { get; set; }
        public DbSet<ClienteProduto> ClienteProduto { get; set; }

    }
}
