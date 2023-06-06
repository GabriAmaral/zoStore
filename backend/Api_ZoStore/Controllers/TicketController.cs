using Api_ZoStore.Models.Entities;
using Api_ZoStore.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Api_ZoStore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private ITicketRepository _ticketRepository;
        private IChatTicketMessagesRepository _chatTicketMessagesRepository;
        private IUsuarioRepository _usuarioRepository;
        private IProdutoRepository _produtoRepository;

        public TicketController(ITicketRepository ticketRepository,
                                IChatTicketMessagesRepository chatTicketMessagesRepository,
                                IUsuarioRepository usuarioRepository,
                                IProdutoRepository produtoRepository)
        {
            _ticketRepository = ticketRepository;
            _chatTicketMessagesRepository = chatTicketMessagesRepository;
            _usuarioRepository = usuarioRepository;
            _produtoRepository = produtoRepository;
        }

        [HttpPost]
        public IActionResult CriarNovoTicket([FromBody] Ticket ticket)
        {
            ticket.DataAbertura = DateTime.Now;

            var ticketInsert = _ticketRepository.CreateReturnItemInsert(ticket);

            return Ok(ticketInsert?.Id);
        }

        [HttpPost]
        public IActionResult UpdateTicket([FromBody] Ticket ticket)
        {
            try
            {
                _ticketRepository.Update(ticket);

                return Ok(true);
            }
            catch
            {
                return BadRequest($"Não foi possivel atualizer ticket {ticket}");
            }

        }

        [HttpPost]
        public IActionResult NovaMensagemTicket([FromBody] ChatTicketMessages message)
        {
            _chatTicketMessagesRepository.Create(message);

            return Ok(BuscarHistoricoTicket(message.IdTicket));
        }

        [HttpGet]
        public IActionResult BuscarHistoricoTicket(int idTicket)
        {
            try
            {
                var historico = _chatTicketMessagesRepository.GetAll().Where(x => x.IdTicket == idTicket).OrderByDescending(x => x.Id);

                if (historico.ToList().Count == 0)
                    return Ok("Esse ticket não possui histórico");

                foreach (var ticketItem in historico)
                {
                    ticketItem.Usuario = _usuarioRepository.Get(ticketItem.IdRemetente);
                }

                return Ok(historico);
            }
            catch
            {
                return BadRequest("erro ao buscar histórico do ticket");
            }
        }

        [HttpGet]
        public IActionResult BuscarInfosTicket(int idTicket)
        {
            try
            {
                var ticket = _ticketRepository.GetAll().Where(x => x.Id == idTicket).FirstOrDefault();

                if (ticket == null)
                    return Ok("Esse ticket não existe");

                ticket.Produto = _produtoRepository.Get(ticket.IdProduto);
                ticket.Usuario = _usuarioRepository.Get(ticket.IdCliente);

                return Ok(ticket);
            }
            catch
            {
                return BadRequest("erro ao buscar ticket");
            }
        }

        [HttpGet]
        public IActionResult BuscarTicketsCliente(int idCliente)
        {
            try
            {
                var ticketsCliente = _ticketRepository.GetAll().Where(x => x.IdCliente == idCliente);

                foreach (var ticketItem in ticketsCliente)
                {
                    ticketItem.Produto = _produtoRepository.Get(ticketItem.IdProduto);
                }

                if (ticketsCliente.ToList().Count == 0)
                    return Ok("Cliente não possui tickets");

                return Ok(ticketsCliente);
            }
            catch
            {
                return BadRequest("erro ao buscar tickets do cliente");
            }
        }

        [HttpGet]
        public IActionResult BuscarTickets(int status)
        {
            try
            {
                var tickets = _ticketRepository.GetAll();

                if (status != 3)
                    tickets = tickets.Where(x => x.Status == status).ToList();

                if (tickets == null)
                    return Ok("Não há tickets cadastros");

                foreach (var ticketItem in tickets)
                {
                    ticketItem.Usuario = _usuarioRepository.Get(ticketItem.IdCliente);
                    ticketItem.Produto = _produtoRepository.Get(ticketItem.IdProduto);
                }

                return Ok(tickets);
            }
            catch
            {
                return BadRequest("Erro ao buscar todos tickets");
            }

        }
    }
}
