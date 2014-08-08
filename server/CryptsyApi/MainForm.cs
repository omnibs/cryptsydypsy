using System;
using System.Globalization;
using System.Threading;
using System.Windows.Forms;
using CryptoWorks.Cryptsy;
using PusherClient;

namespace CryptsyApi
{
    public partial class MainForm : Form
    {

        private Pusher _pusher = null;

        public MainForm()
        {
            InitializeComponent();
            CryptoWorks.Cryptsy.CryptsyApi.PublicKey = System.Configuration.ConfigurationManager.AppSettings["publicKey"];
            CryptoWorks.Cryptsy.CryptsyApi.PrivateKey =
                System.Configuration.ConfigurationManager.AppSettings["privateKey"];
            //PusherTest();
        }

        private async void PusherTest()
        {
            _pusher = new Pusher("41629b0417bad133acb8", new PusherOptions(){ Encrypted = true});
            _pusher.Connect();
            _pusher.Connected += Connected;

        }

        private void Connected(object sender)
        {

            var chat = _pusher.Subscribe("chat");
            chat.Bind("message", (dynamic data) =>
            {
                Console.WriteLine("[" + data.name + "] " + data.message);
            });
        }

        private void UpdateInfo()
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = CultureInfo.InvariantCulture;
            while (true)
            {
                Thread.Sleep(1000);
                TradeService.UpdateInfo();

                Invoke(new Action(() =>
                {
                    btcAvailable.Text = TradeService.BtcAvailable.ToString(CultureInfo.InvariantCulture);
                    btcHeld.Text = TradeService.BtcAvailable.ToString(CultureInfo.InvariantCulture);
                    btcTotal.Text = TradeService.BtcTotal.ToString(CultureInfo.InvariantCulture);

                    coinAval.Text = TradeService.CoinAvailable.ToString("#,#0.#0");
                    coinHeld.Text = TradeService.CoinHeld.ToString("#,#0.#0");
                    coinTotal.Text = TradeService.CoinTotal.ToString("#,#0.#0");
                }));

            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            var t = new Thread(UpdateInfo);
            t.Start();
        }

        private void putBuyBtn_Click(object sender, EventArgs e)
        {
            TradeService.PutBuyOrder(Convert.ToInt32(buyValueTextBox.Text), Convert.ToInt32(buySplitTextBox.Text), Convert.ToDecimal(buyLimitTextBox.Text));
        }

        private void cancelBuyAt_Click(object sender, EventArgs e)
        {
            TradeService.RemoveFromOrder(Convert.ToInt32(removeBuyPrice.Text), Convert.ToDecimal(removeBuyLimitTextBox.Text), OrderType.Buy);
        }

        private void removeFromSellBtn_Click(object sender, EventArgs e)
        {
            TradeService.RemoveFromOrder(Convert.ToInt32(removeSellPriceTextBox.Text), Convert.ToDecimal(removeSellLimitTextBox.Text), OrderType.Sell);
        }

        private void butSellBtn_Click(object sender, EventArgs e)
        {
            TradeService.PutSellOrder(Convert.ToInt32(sellValueTextBox.Text), Convert.ToInt32(sellSplitTextBox.Text), Convert.ToDecimal(sellLimitTextBox.Text));

        }
    }
}
