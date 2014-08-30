using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CryptsyApi.Server
{
    public interface IMarketData
    {
        decimal Price { get; set; }
    }
}
