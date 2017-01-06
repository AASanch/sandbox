using System.Collections.Generic;
using OpenGameList.ViewModels;

namespace OpenGameList.Services
{
    public interface IItemsProviderService
    {
         IEnumerable<ItemViewModel> GetAllItems();
    }
}