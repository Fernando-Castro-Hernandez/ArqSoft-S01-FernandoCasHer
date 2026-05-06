using Catalogo.Models;
using Microsoft.AspNetCore.Mvc;

namespace Catalogo.Controllers
{
    public class CatalogoController : Controller
    {
        private static List<Item> _items = new()
        {
            new Item
            {
                Id = 1,
                Nombre = "Caballero",
                Elixir = 3,
                Calidad = "Común",
                Tipo = "Tropa",
                Arena = 0
            },
            new Item
            {
                Id = 2,
                Nombre = "Bola de Fuego",
                Elixir = 4,
                Calidad = "Rara",
                Tipo = "Hechizo",
                Arena = 0
            },
            new Item
            {
                Id = 3,
                Nombre = "Cabaña de Bárbaros",
                Elixir = 7,
                Calidad = "Rara",
                Tipo = "Estructura",
                Arena = 3
            },
            new Item
            {
                Id = 4,
                Nombre = "P.E.K.K.A.",
                Elixir = 7,
                Calidad = "Épica",
                Tipo = "Tropa",
                Arena = 4
            },
            new Item
            {
                Id = 5,
                Nombre = "Mago Eléctrico",
                Elixir = 4,
                Calidad = "Legendaria",
                Tipo = "Tropa",
                Arena = 12
            }
        };

        // Lista — con filtro opcional por tipo
        public IActionResult Index(string? tipo)
        {
            var resultado = string.IsNullOrEmpty(tipo)
                ? _items
                : _items.Where(i => i.Tipo == tipo).ToList();

            ViewBag.Tipos = _items.Select(i => i.Tipo).Distinct().ToList();
            ViewBag.TipoActual = tipo;

            return View(resultado);
        }

        // Detalle
        public IActionResult Detalle(int id)
        {
            var item = _items.FirstOrDefault(i => i.Id == id);
            return item == null ? NotFound() : View(item);
        }

        // Formulario GET
        public IActionResult Agregar()
        {
            return View();
        }

        // Formulario POST
        [HttpPost]
        public IActionResult Agregar(Item item)
        {
            item.Id = _items.Count + 1;
            _items.Add(item);
            return RedirectToAction("Index");
        }
    }
}