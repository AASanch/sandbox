using System;
using System.Collections.Generic;
using System.Linq;
using OpenGameList.ViewModels;

namespace OpenGameList.Services
{
    public class ItemsProviderService : IItemsProviderService
    {
        private List<ItemViewModel> _items = new List<ItemViewModel>();
        private Random _rng = new Random();

        public int ItemCount => this._items.Count;

        public ItemsProviderService() 
        {
            this.Init();
        }
        
        IEnumerable<ItemViewModel> IItemsProviderService.GetAllItems()
        {
            return this._items;
        }

        ItemViewModel IItemsProviderService.GetItem(int id)
            =>this._items.FirstOrDefault(item => item.Id == id);

        private void Init() 
        {
            var startDate = new DateTime(2016, 1, 1);
            for (int i = 0; i < 1000; i++)
            {
                var item = new ItemViewModel{
                    Id = i,
                    Title = $"Item {i} Title.",
                    Description = $"This is a sample description for item {i}: Lorem ipsum dolor sit amet.",
                };
                item.CreatedDate = startDate.AddDays(_rng.Next(100));
                item.LastModifiedDate = item.CreatedDate.AddDays(_rng.Next(10));
                item.ViewCount = _rng.Next(10000);
                _items.Add(item);
            }
        }
    }
}