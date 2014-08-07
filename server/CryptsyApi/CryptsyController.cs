using System.Web.Http;
using CryptoWorks.Cryptsy.Entities;

namespace CryptsyApi
{
    public class CryptsyController : ApiController
    {
        public Info GetInfo()
        {
            return TradeService.UserInfo;
        }
    }
}
