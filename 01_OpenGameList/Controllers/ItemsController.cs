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

        [HttpGet("GetLatest/{num}")]
        public JsonResult GetLatest(int num)
        {
            var items = this._itemsProvider
                .GetAllItems()
                .OrderBy(item => item.CreatedDate)
                .Take(num);

            return new JsonResult(items, DefaultJsonSettings);
        }

        [HttpGet("GetMostViewed/{num}")]
        public JsonResult GetMostViewed(int num)
        {
            var items = this._itemsProvider
                .GetAllItems()
                .OrderByDescending(item => item.ViewCount)           
                .Take(num);
            return new JsonResult(items, DefaultJsonSettings);
        }

        [HttpGet("GetRandom/{num}")]
        public JsonResult GetRandom(int num)
        {
             var items = this._itemsProvider
                .GetAllItems()
                .OrderBy(item => Guid.NewGuid())           
                .Take(num);
            return new JsonResult(items, DefaultJsonSettings);
        }
    }
}