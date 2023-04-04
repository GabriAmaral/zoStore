using Api_ZoStore.Models.Entities;
using Api_ZoStore.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Api_ZoStore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioRepository repos;

        public UsuarioController(IUsuarioRepository repos)
        {
            this.repos = repos;
        }

        [HttpGet]
        public IActionResult Get(int user)
        {
            var user_db = repos.Get(user);

            if (user_db == null)
                return BadRequest("Usuario não encontrado");

            return Ok(user_db);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Usuario user)
        {
            var existUser = repos.GetAll().Where(x => x.Email == user.Email).FirstOrDefault();

            if(existUser is not null)
                return BadRequest("Este usuário já existe");

            repos.Create(user);

            return Ok(true);
        }

        [HttpPost]
        public IActionResult Update([FromBody] Usuario user)
        {
            repos.Update(user);

            return Ok(true);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = repos.GetAll();

            if(users.ToList().Count == 0)
                return BadRequest("Erro ao buscar usuarios");

            return Ok(users);
        }

        [HttpGet]
        public IActionResult GetClientes()
        {
            var users = repos.GetAll().Where(x => x.Access == 0).ToList();

            if (users.Count == 0)
                return BadRequest("Não possiu clientes cadastrados");

            return Ok(users);
        }

        [HttpGet]
        public IActionResult GetFuncionarios()
        {
            var users = repos.GetAll().Where(x => x.Access != 0).FirstOrDefault();

            if (users == null)
                return BadRequest("Colaborador não cadastrado");

            return Ok(users);
        }

        [HttpPost]
        public IActionResult CheckPasswordAlter([FromBody] Usuario user)
        {
            var loginUser = repos.GetAll().Where(x => x.Email == user.Email).FirstOrDefault();

            if (loginUser is not null)
            {
                if (loginUser.Password == user.Password)
                    return Ok(true);
            }

            return Ok(false);
        }

        [HttpPost]
        public IActionResult CheckLogin([FromBody] Usuario user)
        {
            var loginUser = repos.GetAll().Where(x => x.Email == user.Email).FirstOrDefault();

            if(loginUser is not null)
            {
                if (loginUser.Password == user.Password)
                    return Ok(loginUser);
            }

            return BadRequest("Login e senha inválido");
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete([FromRoute] Usuario user)
        {
            if (repos.Delete(user.Id))
                return Ok();

            return BadRequest();
        }

    }
}
