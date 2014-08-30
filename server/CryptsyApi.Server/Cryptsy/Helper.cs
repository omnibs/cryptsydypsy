using CryptsyApi.Cryptsy.Entities;

namespace CryptsyApi.Cryptsy
{
    public class Helper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="coins"></param>
        /// <param name="market"></param>
        /// <returns></returns>
        public decimal CanBuyCoinsWithN(decimal coins, Market market)
        {
            const decimal total = 0m;
            foreach (var sellorder in market.SellOrders)
            {
                if (coins < 0)
                    break;
                sellorder.
                Total += sellorder.Quantity;
                var cost = sellorder.Price * sellorder.Quantity;
                coins -= cost;
            }

            return total;
        }
    }
}
