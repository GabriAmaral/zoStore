using Api_ZoStore.Models.Entities;
using Api_ZoStore.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Api_ZoStore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IProdutoRepository _produtoRepository;
        private readonly IClienteProdutoRepository _clienteProdutoRepository;

        public ProdutoController(
            IProdutoRepository produtoRepository,
            IUsuarioRepository usuarioRepository,
            IClienteProdutoRepository clienteProdutoRepository
        )
        {
            this._produtoRepository = produtoRepository;
            this._usuarioRepository = usuarioRepository;
            this._clienteProdutoRepository = clienteProdutoRepository;
        }

        [HttpPost]
        public IActionResult LiberarProdutoCliente([FromBody] ClienteProduto clienteProduto)
        {
            _clienteProdutoRepository.Create(clienteProduto);

            return Ok(true);
        }

        [HttpGet]
        public IActionResult BuscarProdutosCliente(int idCliente)
        {
            try
            {
                var produtosCliente = _clienteProdutoRepository.GetAll().Where(x => x.IdCliente == idCliente).Select(x => x.IdProduto);
                var produtos = _produtoRepository.GetAll().Where(x => produtosCliente.Contains(x.Id));

                if (produtos.ToList().Count == 0)
                    return Ok("Cliente não possui produtos");

                return Ok(produtos);
            }
            catch
            {
                return BadRequest("erro ao buscar produtos do cliente");
            }

        }

        [HttpGet]
        public IActionResult BuscarVendar()
        {
            var produtosCliente = _clienteProdutoRepository.GetAll();

            return Ok(produtosCliente);
        }

        [HttpGet]
        public IActionResult BuscarProduto(int id)
        {
            try
            {
                var produto = _produtoRepository.Get(id);

                return Ok(produto);
            }
            catch
            {
                return BadRequest($"Não foi possivel buscar produto: {id}");
            }

        }

        [HttpPost]
        public IActionResult CriarProduto([FromBody] Produto produto)
        {
            try
            {
                _produtoRepository.Create(produto);

                return Ok(true);
            }
            catch
            {
                return BadRequest("Erro ao criar produto");
            }

        }

        [HttpPost]
        public IActionResult Update([FromBody] Produto produto)
        {
            try
            {
                _produtoRepository.Update(produto);

                return Ok(true);
            }
            catch
            {
                return BadRequest($"Não foi possivel atualizer produto {produto}");
            }

        }

        [HttpGet]
        public IActionResult BuscarProdutos()
        {
            try
            {
                var produtos = _produtoRepository.GetAll();

                if (produtos == null)
                    return Ok("Não há produtos cadastros");

                return Ok(produtos);
            }
            catch
            {
                return BadRequest("Erro ao buscar todos produtos");
            }

        }

        [HttpDelete()]
        public IActionResult DeletarProduto(int id)
        {
            if (_produtoRepository.Delete(id))
                return Ok();

            return BadRequest();
        }

        [HttpPost()]
        public IActionResult DeletarProdutoCliente(ClienteProduto clienteProduto)
        {
            if (_clienteProdutoRepository.DeleteComposite(clienteProduto))
                return Ok();

            return BadRequest();
        }

    }
}
