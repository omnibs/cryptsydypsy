using System.Web.Http;
using CryptoWorks.Cryptsy.Entities;
using CryptsyApi.Cryptsy.Entities;
using Newtonsoft.Json.Linq;

namespace CryptsyApi
{
    public class CryptsyController : ApiController
    {
        public JObject GetInfo()
        {
            return JObject.FromObject(TradeService.UserInfo);
        }
    }
}
