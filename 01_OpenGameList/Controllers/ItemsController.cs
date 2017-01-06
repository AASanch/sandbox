using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OpenGameList.Services;
using OpenGameList.ViewModels;
using System.Linq;
using System;

namespace OpenGameList.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private const int DefaultCount = 10;
        private IItemsProviderService _itemsProvider;
        
        private JsonSerializerSettings DefaultJsonSettings { get; } 
            = new JsonSerializerSettings 
            { 
                Formatting = Formatting.Indented
            };

        public ItemsController(IItemsProviderService itemsProvider)
        {
            this._itemsProvider = itemsProvider;    
        }

        [HttpGet()]
        public IActionResult Get()
        {
            return new NotFoundResult();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) 
        {
            var item = this._itemsProvider.GetItem(id);
            return new JsonResult(item, DefaultJsonSettings);
        }

        [HttpGet("GetLatest")]
        public IActionResult GetLatest() => GetLatest(DefaultCount);
        

        [HttpGet("GetLatest/{num}")]
        public IActionResult GetLatest(int num)
        {
            var n = Math.Min(num, _itemsProvider.ItemCount);
            var items = this._itemsProvider
                .GetAllItems()
                .OrderBy(item => item.CreatedDate)
                .Take(n);

            return new JsonResult(items, DefaultJsonSettings);
        }

        [HttpGet("GetMostViewed")]
        public IActionResult GetMostViewed() => GetMostViewed(DefaultCount);

        [HttpGet("GetMostViewed/{num}")]
        public JsonResult GetMostViewed(int num)
        {
            var n = Math.Min(num, _itemsProvider.ItemCount);
            var items = this._itemsProvider
                .GetAllItems()
                .OrderByDescending(item => item.ViewCount)           
                .Take(n);
            return new JsonResult(items, DefaultJsonSettings);
        }

        [HttpGet("GetRandom")]
        public JsonResult GetRandom() => GetRandom(DefaultCount);

        [HttpGet("GetRandom/{num}")]
        public JsonResult GetRandom(int num)
        {
            var n = Math.Min(num, _itemsProvider.ItemCount);
             var items = this._itemsProvider
                .GetAllItems()
                .OrderBy(item => Guid.NewGuid())           
                .Take(n);
            return new JsonResult(items, DefaultJsonSettings);
        }
    }
}