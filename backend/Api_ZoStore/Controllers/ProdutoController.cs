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

        public ProdutoController(
            IProdutoRepository produtoRepository,
            IUsuarioRepository usuarioRepository
        )
        {
            this._produtoRepository = produtoRepository;
            this._usuarioRepository = usuarioRepository;
        }

        [HttpGet]
        public IActionResult BuscarProduto(int id)
        {
            var produto = _produtoRepository.Get(id);

            return Ok(produto);
        }

        [HttpPost]
        public IActionResult CriarProduto([FromBody] Produto produto)
        {
            _produtoRepository.Create(produto);
               
            return Ok(true);
        }

        [HttpPost]
        public IActionResult Update([FromBody] Produto produto)
        {
            _produtoRepository.Update(produto);

            return Ok(true);
        }

        [HttpGet]
        public IActionResult BuscarProdutos()
        {
            var produtos = _produtoRepository.GetAll();
            return Ok(produtos);
        }

        [HttpDelete()]
        public IActionResult DeletarProduto(int id)
        {
            if (_produtoRepository.Delete(id))
                return Ok();

            return BadRequest();
        }

    }
}
