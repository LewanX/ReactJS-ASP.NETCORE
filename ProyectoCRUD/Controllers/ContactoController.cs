using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoCRUD.Models;

namespace ProyectoCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly ContactsContext _contactsContext;

        public ContactoController(ContactsContext context)
        {
            _contactsContext = context;
        }
        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Contacto> lista = await _contactsContext.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Contacto request)
        {
            await _contactsContext.Contactos.AddAsync(request);
            await _contactsContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Contacto request)
        {
            _contactsContext.Contactos.Update(request);
            await _contactsContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Contacto contacto = _contactsContext.Contactos.Find(id);
            _contactsContext.Contactos.Remove(contacto);
            await _contactsContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
