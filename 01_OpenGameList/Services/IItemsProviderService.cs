using System.Collections.Generic;
using OpenGameList.ViewModels;

namespace OpenGameList.Services
{
    public interface IItemsProviderService
    {
        int ItemCount {get;}
        IEnumerable<ItemViewModel> GetAllItems();
        ItemViewModel GetItem(int id);
    }
}