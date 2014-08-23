using System;
using System.Linq;
using System.Threading;
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

        public static bool AutoBuy = false;

        public static bool AutoSell = false;

        public static bool LimitBuy = false;

        public static bool LimitSell = false;

        private static int? lastBuyValue = null;

        private static int? lastSellValue = null;

        public static int? AutoBuyValue { get; set; }

        public static int? AutoSellValue { get; set; }

        public static Info UserInfo
        {
            get { return _info; }
        }

        private static Info _info = null;

        static TradeService()
        {
            var thread = new Thread(TimerEvent);
            thread.Start();
        }

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

        private static void TimerEvent()
        {
            while (true)
            {
                if (AutoBuy && BtcAvailable > 0.01M && AutoBuyValue.HasValue)
                {
                    PutBuyOrder(LimitBuy && lastBuyValue != null ? lastBuyValue.Value : AutoBuyValue.Value, 1, BtcAvailable);
                }

                if (AutoSell && CoinAvailable > 100000 && AutoSellValue.HasValue)
                {
                    PutSellOrder( LimitSell && lastSellValue != null ? lastSellValue.Value : AutoSellValue.Value, 1, CoinAvailable);
                }

                Thread.Sleep(1000);
            }
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
            var priceBtc = sellValue * Satoshi * 0.9975M;
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
            var priceBtc = buyValue * Satoshi * 1.0025M;
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
            _info = CryptoWorks.Cryptsy.CryptsyApi.GetInfo();

            if ((AutoBuy || AutoSell) && (LimitBuy || LimitSell))
            {
                var lastTrade = CryptoWorks.Cryptsy.CryptsyApi.GetTrades(Market)[0];

                var price = Convert.ToInt32(Convert.ToDecimal(lastTrade.Tradeprice)/Satoshi);
                if (lastTrade.Tradetype != "Buy")
                {
                    price--;
                }

                if (AutoBuy)
                {
                    lastBuyValue = price > AutoBuyValue ? AutoBuyValue : price;
                }

                price++;

                if (AutoSell)
                {
                    lastSellValue = price < AutoSellValue ? AutoSellValue : price;
                }
            }

            if (_info.BalancesHold == null)
            {
                return;
            }

            BtcHeld = Convert.ToDecimal(_info.BalancesHold["BTC"] != null ? _info.BalancesHold["BTC"].Value : 0);
            BtcAvailable = Convert.ToDecimal(_info.BalancesAvailable["BTC"] != null ? _info.BalancesAvailable["BTC"].Value : 0);

            CoinHeld = Convert.ToDecimal(_info.BalancesHold["RDD"] != null ? _info.BalancesHold["RDD"].Value : 0);
            CoinAvailable = Convert.ToDecimal(_info.BalancesAvailable["RDD"] != null ? _info.BalancesAvailable["RDD"].Value : 0);
        }
    }
}
