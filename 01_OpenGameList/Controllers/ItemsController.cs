using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OpenGameList.ViewModels;

namespace OpenGameList.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        [HttpGet("GetLatest/{num}")]
        public JsonResult GetLatest(int num)
        {
            var items = new List<ItemViewModel>();
            for (int i = 0; i < num; i++) 
            {
                items.Add(new ItemViewModel() {
                    Id = i,
                    Title = $"Item {i} Title.",
                    Description = $"Item {i} Description."
                });
            }


            return new JsonResult(null);
        }
    }
}