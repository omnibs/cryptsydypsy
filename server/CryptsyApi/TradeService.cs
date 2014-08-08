using System;
using System.Linq;
using CryptoWorks.Cryptsy;
using CryptsyApi.Cryptsy.Entities;

namespace CryptsyApi
{
    public static class TradeService
    {
        public const string Market = "169";
        public const string CoinName = "RDD";

        public static decimal BtcHeld { get; private set; }
        public static decimal BtcAvailable { get; private set; }


        public static Info UserInfo
        {
            get { return info; }
        }

        private static Info info = null;

        public static decimal BtcTotal
        {
            get { return BtcAvailable + BtcHeld; }
        }

        public static decimal CoinHeld { get; private set; }
        public static decimal CoinAvailable { get; private set; }

        private const decimal Satoshi = 0.00000001M;

        public static decimal CoinTotal
        {
            get { return CoinAvailable + CoinHeld; }
        }

        public static void RemoveFromOrder(int buyValue, decimal limit, OrderType orderType)
        {
            var btcValue = buyValue * Satoshi;
            var orders = CryptoWorks.Cryptsy.CryptsyApi.GetAllMyOrders();
            var candidates =
                orders.Where(o => o.Marketid == Market && o.Price == btcValue && o.Ordertype == orderType.ToString()).OrderByDescending(o => o.Created);
            var removed = 0M;
            foreach (var order in candidates)
            {
                if (removed + order.Total <= limit)
                {
                    CryptoWorks.Cryptsy.CryptsyApi.CancellOrder(order.Orderid);
                    removed += order.Total;
                }
            }
        }


        public static void PutSellOrder(int sellValue, int parts, decimal limit)
        {
            var priceBtc = sellValue * Satoshi;
            var total = CoinAvailable * priceBtc;
            var orderLimit = total > limit ? limit : total;
            var quantity = orderLimit / priceBtc / parts;

            for (var x = 0; x < parts; x++)
            {
                var result = CryptoWorks.Cryptsy.CryptsyApi.CreateOrder(Market, OrderType.Sell, quantity, priceBtc);
            }
        }


        public static void PutBuyOrder(int buyValue, int parts, decimal limit)
        {
            var priceBtc = buyValue * Satoshi;
            var total = BtcAvailable;
            var orderLimit = total > limit ? limit : total;
            var quantity = orderLimit / priceBtc / parts;

            for (var x = 0; x < parts; x++)
            {
                var response = CryptoWorks.Cryptsy.CryptsyApi.CreateOrder(Market, OrderType.Buy, quantity, priceBtc);
            }
        }

        public static void UpdateInfo()
        {
            info = CryptoWorks.Cryptsy.CryptsyApi.GetInfo();

            if (info.BalancesHold == null)
            {
                return;
            }

            BtcHeld = Convert.ToDecimal(info.BalancesHold["BTC"] != null ? info.BalancesHold["BTC"].Value : 0);
            BtcAvailable = Convert.ToDecimal(info.BalancesAvailable["BTC"] != null ? info.BalancesAvailable["BTC"].Value : 0);

            CoinHeld = Convert.ToDecimal(info.BalancesHold["RDD"] != null ? info.BalancesHold["RDD"].Value : 0);
            CoinAvailable = Convert.ToDecimal(info.BalancesAvailable["RDD"] != null ? info.BalancesAvailable["RDD"].Value : 0);
        }
    }
}
