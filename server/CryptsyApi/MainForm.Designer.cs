namespace CryptsyApi
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.coinName = new System.Windows.Forms.Label();
            this.coinAval = new System.Windows.Forms.Label();
            this.comboBox1 = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.autobuyTxb = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.autosellTxb = new System.Windows.Forms.TextBox();
            this.logBox = new System.Windows.Forms.RichTextBox();
            this.autobuyCkb = new System.Windows.Forms.CheckBox();
            this.autosellCkb = new System.Windows.Forms.CheckBox();
            this.CancelBuyBtn = new System.Windows.Forms.Button();
            this.cancelSellBtn = new System.Windows.Forms.Button();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.buyLimit = new System.Windows.Forms.TextBox();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.sellLimit = new System.Windows.Forms.TextBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.coinTotal = new System.Windows.Forms.Label();
            this.coinHeld = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.btcTotal = new System.Windows.Forms.Label();
            this.btcHeld = new System.Windows.Forms.Label();
            this.label12 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.btcAvailable = new System.Windows.Forms.Label();
            this.buyValueTextBox = new System.Windows.Forms.TextBox();
            this.label11 = new System.Windows.Forms.Label();
            this.buySplitTextBox = new System.Windows.Forms.TextBox();
            this.putBuyBtn = new System.Windows.Forms.Button();
            this.butSellBtn = new System.Windows.Forms.Button();
            this.sellSplitTextBox = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.sellValueTextBox = new System.Windows.Forms.TextBox();
            this.label15 = new System.Windows.Forms.Label();
            this.buyLimitTextBox = new System.Windows.Forms.TextBox();
            this.label16 = new System.Windows.Forms.Label();
            this.label17 = new System.Windows.Forms.Label();
            this.sellLimitTextBox = new System.Windows.Forms.TextBox();
            this.label18 = new System.Windows.Forms.Label();
            this.label19 = new System.Windows.Forms.Label();
            this.removeSellPriceTextBox = new System.Windows.Forms.TextBox();
            this.label20 = new System.Windows.Forms.Label();
            this.removeBuyPrice = new System.Windows.Forms.TextBox();
            this.label21 = new System.Windows.Forms.Label();
            this.label22 = new System.Windows.Forms.Label();
            this.removeFromSellBtn = new System.Windows.Forms.Button();
            this.removeFromBuyBtn = new System.Windows.Forms.Button();
            this.label23 = new System.Windows.Forms.Label();
            this.removeBuyLimitTextBox = new System.Windows.Forms.TextBox();
            this.label24 = new System.Windows.Forms.Label();
            this.label25 = new System.Windows.Forms.Label();
            this.removeSellLimitTextBox = new System.Windows.Forms.TextBox();
            this.label26 = new System.Windows.Forms.Label();
            this.ckbLimitBuy = new System.Windows.Forms.CheckBox();
            this.ckbLimitSell = new System.Windows.Forms.CheckBox();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.priceDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.quantityDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.simpleOrderBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.simpleOrderBindingSource)).BeginInit();
            this.SuspendLayout();
            // 
            // coinName
            // 
            this.coinName.AutoSize = true;
            this.coinName.Location = new System.Drawing.Point(6, 27);
            this.coinName.Name = "coinName";
            this.coinName.Size = new System.Drawing.Size(69, 17);
            this.coinName.TabIndex = 0;
            this.coinName.Text = "Available:";
            // 
            // coinAval
            // 
            this.coinAval.AutoSize = true;
            this.coinAval.Location = new System.Drawing.Point(80, 27);
            this.coinAval.Name = "coinAval";
            this.coinAval.Size = new System.Drawing.Size(16, 17);
            this.coinAval.TabIndex = 1;
            this.coinAval.Text = "0";
            // 
            // comboBox1
            // 
            this.comboBox1.FormattingEnabled = true;
            this.comboBox1.Location = new System.Drawing.Point(100, 12);
            this.comboBox1.Name = "comboBox1";
            this.comboBox1.Size = new System.Drawing.Size(179, 24);
            this.comboBox1.TabIndex = 2;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(39, 15);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(59, 17);
            this.label2.TabIndex = 3;
            this.label2.Text = "Martket:";
            // 
            // autobuyTxb
            // 
            this.autobuyTxb.Location = new System.Drawing.Point(144, 80);
            this.autobuyTxb.Name = "autobuyTxb";
            this.autobuyTxb.Size = new System.Drawing.Size(100, 22);
            this.autobuyTxb.TabIndex = 4;
            this.autobuyTxb.TextChanged += new System.EventHandler(this.autobuyTxb_TextChanged);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(250, 83);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(27, 17);
            this.label3.TabIndex = 6;
            this.label3.Text = "sat";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(250, 122);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(27, 17);
            this.label4.TabIndex = 9;
            this.label4.Text = "sat";
            // 
            // autosellTxb
            // 
            this.autosellTxb.Location = new System.Drawing.Point(144, 119);
            this.autosellTxb.Name = "autosellTxb";
            this.autosellTxb.Size = new System.Drawing.Size(100, 22);
            this.autosellTxb.TabIndex = 7;
            this.autosellTxb.TextChanged += new System.EventHandler(this.autosellTxb_TextChanged);
            // 
            // logBox
            // 
            this.logBox.Location = new System.Drawing.Point(32, 376);
            this.logBox.Name = "logBox";
            this.logBox.Size = new System.Drawing.Size(388, 55);
            this.logBox.TabIndex = 10;
            this.logBox.Text = "";
            // 
            // autobuyCkb
            // 
            this.autobuyCkb.AutoSize = true;
            this.autobuyCkb.Location = new System.Drawing.Point(32, 79);
            this.autobuyCkb.Name = "autobuyCkb";
            this.autobuyCkb.Size = new System.Drawing.Size(106, 21);
            this.autobuyCkb.TabIndex = 11;
            this.autobuyCkb.Text = "Auto-Buy @";
            this.autobuyCkb.UseVisualStyleBackColor = true;
            this.autobuyCkb.CheckedChanged += new System.EventHandler(this.autobuyCkb_CheckedChanged);
            // 
            // autosellCkb
            // 
            this.autosellCkb.AutoSize = true;
            this.autosellCkb.Location = new System.Drawing.Point(32, 121);
            this.autosellCkb.Name = "autosellCkb";
            this.autosellCkb.Size = new System.Drawing.Size(105, 21);
            this.autosellCkb.TabIndex = 12;
            this.autosellCkb.Text = "Auto-Sell @";
            this.autosellCkb.UseVisualStyleBackColor = true;
            this.autosellCkb.CheckedChanged += new System.EventHandler(this.autosellCkb_CheckedChanged);
            // 
            // CancelBuyBtn
            // 
            this.CancelBuyBtn.Location = new System.Drawing.Point(32, 180);
            this.CancelBuyBtn.Name = "CancelBuyBtn";
            this.CancelBuyBtn.Size = new System.Drawing.Size(152, 23);
            this.CancelBuyBtn.TabIndex = 13;
            this.CancelBuyBtn.Text = "Cancel Buy Orders";
            this.CancelBuyBtn.UseVisualStyleBackColor = true;
            // 
            // cancelSellBtn
            // 
            this.cancelSellBtn.Location = new System.Drawing.Point(364, 180);
            this.cancelSellBtn.Name = "cancelSellBtn";
            this.cancelSellBtn.Size = new System.Drawing.Size(152, 23);
            this.cancelSellBtn.TabIndex = 14;
            this.cancelSellBtn.Text = "Cancel Sell Orders";
            this.cancelSellBtn.UseVisualStyleBackColor = true;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(199, 183);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(24, 17);
            this.label5.TabIndex = 15;
            this.label5.Text = ">=";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(527, 183);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(24, 17);
            this.label6.TabIndex = 16;
            this.label6.Text = "<=";
            // 
            // buyLimit
            // 
            this.buyLimit.Location = new System.Drawing.Point(227, 177);
            this.buyLimit.Name = "buyLimit";
            this.buyLimit.Size = new System.Drawing.Size(82, 22);
            this.buyLimit.TabIndex = 17;
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(321, 180);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(27, 17);
            this.label7.TabIndex = 18;
            this.label7.Text = "sat";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(649, 180);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(27, 17);
            this.label8.TabIndex = 20;
            this.label8.Text = "sat";
            // 
            // sellLimit
            // 
            this.sellLimit.Location = new System.Drawing.Point(555, 177);
            this.sellLimit.Name = "sellLimit";
            this.sellLimit.Size = new System.Drawing.Size(82, 22);
            this.sellLimit.TabIndex = 19;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.coinTotal);
            this.groupBox1.Controls.Add(this.coinHeld);
            this.groupBox1.Controls.Add(this.label10);
            this.groupBox1.Controls.Add(this.label9);
            this.groupBox1.Controls.Add(this.coinName);
            this.groupBox1.Controls.Add(this.coinAval);
            this.groupBox1.Location = new System.Drawing.Point(412, 16);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(225, 87);
            this.groupBox1.TabIndex = 22;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "RDD";
            // 
            // coinTotal
            // 
            this.coinTotal.AutoSize = true;
            this.coinTotal.Location = new System.Drawing.Point(80, 59);
            this.coinTotal.Name = "coinTotal";
            this.coinTotal.Size = new System.Drawing.Size(16, 17);
            this.coinTotal.TabIndex = 25;
            this.coinTotal.Text = "0";
            // 
            // coinHeld
            // 
            this.coinHeld.AutoSize = true;
            this.coinHeld.Location = new System.Drawing.Point(80, 43);
            this.coinHeld.Name = "coinHeld";
            this.coinHeld.Size = new System.Drawing.Size(16, 17);
            this.coinHeld.TabIndex = 24;
            this.coinHeld.Text = "0";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(6, 59);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(44, 17);
            this.label10.TabIndex = 23;
            this.label10.Text = "Total:";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(6, 43);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(41, 17);
            this.label9.TabIndex = 1;
            this.label9.Text = "Held:";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.btcTotal);
            this.groupBox2.Controls.Add(this.btcHeld);
            this.groupBox2.Controls.Add(this.label12);
            this.groupBox2.Controls.Add(this.label13);
            this.groupBox2.Controls.Add(this.label14);
            this.groupBox2.Controls.Add(this.btcAvailable);
            this.groupBox2.Location = new System.Drawing.Point(652, 14);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(197, 88);
            this.groupBox2.TabIndex = 26;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "BTC";
            // 
            // btcTotal
            // 
            this.btcTotal.AutoSize = true;
            this.btcTotal.Location = new System.Drawing.Point(80, 59);
            this.btcTotal.Name = "btcTotal";
            this.btcTotal.Size = new System.Drawing.Size(16, 17);
            this.btcTotal.TabIndex = 25;
            this.btcTotal.Text = "0";
            // 
            // btcHeld
            // 
            this.btcHeld.AutoSize = true;
            this.btcHeld.Location = new System.Drawing.Point(80, 43);
            this.btcHeld.Name = "btcHeld";
            this.btcHeld.Size = new System.Drawing.Size(16, 17);
            this.btcHeld.TabIndex = 24;
            this.btcHeld.Text = "0";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Location = new System.Drawing.Point(6, 59);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(44, 17);
            this.label12.TabIndex = 23;
            this.label12.Text = "Total:";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(6, 43);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(41, 17);
            this.label13.TabIndex = 1;
            this.label13.Text = "Held:";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Location = new System.Drawing.Point(5, 26);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(69, 17);
            this.label14.TabIndex = 0;
            this.label14.Text = "Available:";
            // 
            // btcAvailable
            // 
            this.btcAvailable.AutoSize = true;
            this.btcAvailable.Location = new System.Drawing.Point(80, 27);
            this.btcAvailable.Name = "btcAvailable";
            this.btcAvailable.Size = new System.Drawing.Size(16, 17);
            this.btcAvailable.TabIndex = 1;
            this.btcAvailable.Text = "0";
            // 
            // buyValueTextBox
            // 
            this.buyValueTextBox.Location = new System.Drawing.Point(223, 309);
            this.buyValueTextBox.Name = "buyValueTextBox";
            this.buyValueTextBox.Size = new System.Drawing.Size(47, 22);
            this.buyValueTextBox.TabIndex = 28;
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Location = new System.Drawing.Point(276, 314);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(77, 17);
            this.label11.TabIndex = 29;
            this.label11.Text = "sat. Split in";
            // 
            // buySplitTextBox
            // 
            this.buySplitTextBox.Location = new System.Drawing.Point(364, 308);
            this.buySplitTextBox.Name = "buySplitTextBox";
            this.buySplitTextBox.Size = new System.Drawing.Size(47, 22);
            this.buySplitTextBox.TabIndex = 30;
            // 
            // putBuyBtn
            // 
            this.putBuyBtn.Location = new System.Drawing.Point(32, 308);
            this.putBuyBtn.Name = "putBuyBtn";
            this.putBuyBtn.Size = new System.Drawing.Size(182, 23);
            this.putBuyBtn.TabIndex = 31;
            this.putBuyBtn.Text = "Put buy order of ";
            this.putBuyBtn.UseVisualStyleBackColor = true;
            this.putBuyBtn.Click += new System.EventHandler(this.putBuyBtn_Click);
            // 
            // butSellBtn
            // 
            this.butSellBtn.Location = new System.Drawing.Point(32, 347);
            this.butSellBtn.Name = "butSellBtn";
            this.butSellBtn.Size = new System.Drawing.Size(182, 23);
            this.butSellBtn.TabIndex = 35;
            this.butSellBtn.Text = "Put sell order of ";
            this.butSellBtn.UseVisualStyleBackColor = true;
            this.butSellBtn.Click += new System.EventHandler(this.butSellBtn_Click);
            // 
            // sellSplitTextBox
            // 
            this.sellSplitTextBox.Location = new System.Drawing.Point(364, 347);
            this.sellSplitTextBox.Name = "sellSplitTextBox";
            this.sellSplitTextBox.Size = new System.Drawing.Size(47, 22);
            this.sellSplitTextBox.TabIndex = 34;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(281, 350);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(77, 17);
            this.label1.TabIndex = 33;
            this.label1.Text = "sat. Split in";
            // 
            // sellValueTextBox
            // 
            this.sellValueTextBox.Location = new System.Drawing.Point(223, 348);
            this.sellValueTextBox.Name = "sellValueTextBox";
            this.sellValueTextBox.Size = new System.Drawing.Size(47, 22);
            this.sellValueTextBox.TabIndex = 32;
            // 
            // label15
            // 
            this.label15.AutoSize = true;
            this.label15.Location = new System.Drawing.Point(417, 313);
            this.label15.Name = "label15";
            this.label15.Size = new System.Drawing.Size(44, 17);
            this.label15.TabIndex = 36;
            this.label15.Text = "limit =";
            // 
            // buyLimitTextBox
            // 
            this.buyLimitTextBox.Location = new System.Drawing.Point(467, 308);
            this.buyLimitTextBox.Name = "buyLimitTextBox";
            this.buyLimitTextBox.Size = new System.Drawing.Size(47, 22);
            this.buyLimitTextBox.TabIndex = 37;
            // 
            // label16
            // 
            this.label16.AutoSize = true;
            this.label16.Location = new System.Drawing.Point(522, 311);
            this.label16.Name = "label16";
            this.label16.Size = new System.Drawing.Size(27, 17);
            this.label16.TabIndex = 38;
            this.label16.Text = "btc";
            // 
            // label17
            // 
            this.label17.AutoSize = true;
            this.label17.Location = new System.Drawing.Point(524, 348);
            this.label17.Name = "label17";
            this.label17.Size = new System.Drawing.Size(27, 17);
            this.label17.TabIndex = 41;
            this.label17.Text = "btc";
            // 
            // sellLimitTextBox
            // 
            this.sellLimitTextBox.Location = new System.Drawing.Point(469, 345);
            this.sellLimitTextBox.Name = "sellLimitTextBox";
            this.sellLimitTextBox.Size = new System.Drawing.Size(47, 22);
            this.sellLimitTextBox.TabIndex = 40;
            // 
            // label18
            // 
            this.label18.AutoSize = true;
            this.label18.Location = new System.Drawing.Point(419, 350);
            this.label18.Name = "label18";
            this.label18.Size = new System.Drawing.Size(44, 17);
            this.label18.TabIndex = 39;
            this.label18.Text = "limit =";
            // 
            // label19
            // 
            this.label19.AutoSize = true;
            this.label19.Location = new System.Drawing.Point(317, 263);
            this.label19.Name = "label19";
            this.label19.Size = new System.Drawing.Size(27, 17);
            this.label19.TabIndex = 49;
            this.label19.Text = "sat";
            // 
            // removeSellPriceTextBox
            // 
            this.removeSellPriceTextBox.Location = new System.Drawing.Point(223, 260);
            this.removeSellPriceTextBox.Name = "removeSellPriceTextBox";
            this.removeSellPriceTextBox.Size = new System.Drawing.Size(82, 22);
            this.removeSellPriceTextBox.TabIndex = 48;
            // 
            // label20
            // 
            this.label20.AutoSize = true;
            this.label20.Location = new System.Drawing.Point(321, 219);
            this.label20.Name = "label20";
            this.label20.Size = new System.Drawing.Size(27, 17);
            this.label20.TabIndex = 47;
            this.label20.Text = "sat";
            // 
            // removeBuyPrice
            // 
            this.removeBuyPrice.Location = new System.Drawing.Point(227, 216);
            this.removeBuyPrice.Name = "removeBuyPrice";
            this.removeBuyPrice.Size = new System.Drawing.Size(82, 22);
            this.removeBuyPrice.TabIndex = 46;
            // 
            // label21
            // 
            this.label21.AutoSize = true;
            this.label21.Location = new System.Drawing.Point(199, 260);
            this.label21.Name = "label21";
            this.label21.Size = new System.Drawing.Size(22, 17);
            this.label21.TabIndex = 45;
            this.label21.Text = "@";
            // 
            // label22
            // 
            this.label22.AutoSize = true;
            this.label22.Location = new System.Drawing.Point(199, 222);
            this.label22.Name = "label22";
            this.label22.Size = new System.Drawing.Size(22, 17);
            this.label22.TabIndex = 44;
            this.label22.Text = "@";
            // 
            // removeFromSellBtn
            // 
            this.removeFromSellBtn.Location = new System.Drawing.Point(32, 260);
            this.removeFromSellBtn.Name = "removeFromSellBtn";
            this.removeFromSellBtn.Size = new System.Drawing.Size(152, 23);
            this.removeFromSellBtn.TabIndex = 43;
            this.removeFromSellBtn.Text = "Remove From Sell";
            this.removeFromSellBtn.UseVisualStyleBackColor = true;
            this.removeFromSellBtn.Click += new System.EventHandler(this.removeFromSellBtn_Click);
            // 
            // removeFromBuyBtn
            // 
            this.removeFromBuyBtn.Location = new System.Drawing.Point(32, 219);
            this.removeFromBuyBtn.Name = "removeFromBuyBtn";
            this.removeFromBuyBtn.Size = new System.Drawing.Size(152, 23);
            this.removeFromBuyBtn.TabIndex = 42;
            this.removeFromBuyBtn.Text = "Remove from Buy";
            this.removeFromBuyBtn.UseVisualStyleBackColor = true;
            this.removeFromBuyBtn.Click += new System.EventHandler(this.cancelBuyAt_Click);
            // 
            // label23
            // 
            this.label23.AutoSize = true;
            this.label23.Location = new System.Drawing.Point(469, 219);
            this.label23.Name = "label23";
            this.label23.Size = new System.Drawing.Size(27, 17);
            this.label23.TabIndex = 52;
            this.label23.Text = "btc";
            // 
            // removeBuyLimitTextBox
            // 
            this.removeBuyLimitTextBox.Location = new System.Drawing.Point(414, 216);
            this.removeBuyLimitTextBox.Name = "removeBuyLimitTextBox";
            this.removeBuyLimitTextBox.Size = new System.Drawing.Size(47, 22);
            this.removeBuyLimitTextBox.TabIndex = 51;
            // 
            // label24
            // 
            this.label24.AutoSize = true;
            this.label24.Location = new System.Drawing.Point(364, 221);
            this.label24.Name = "label24";
            this.label24.Size = new System.Drawing.Size(44, 17);
            this.label24.TabIndex = 50;
            this.label24.Text = "limit =";
            // 
            // label25
            // 
            this.label25.AutoSize = true;
            this.label25.Location = new System.Drawing.Point(469, 260);
            this.label25.Name = "label25";
            this.label25.Size = new System.Drawing.Size(27, 17);
            this.label25.TabIndex = 55;
            this.label25.Text = "btc";
            // 
            // removeSellLimitTextBox
            // 
            this.removeSellLimitTextBox.Location = new System.Drawing.Point(414, 257);
            this.removeSellLimitTextBox.Name = "removeSellLimitTextBox";
            this.removeSellLimitTextBox.Size = new System.Drawing.Size(47, 22);
            this.removeSellLimitTextBox.TabIndex = 54;
            // 
            // label26
            // 
            this.label26.AutoSize = true;
            this.label26.Location = new System.Drawing.Point(364, 262);
            this.label26.Name = "label26";
            this.label26.Size = new System.Drawing.Size(44, 17);
            this.label26.TabIndex = 53;
            this.label26.Text = "limit =";
            // 
            // ckbLimitBuy
            // 
            this.ckbLimitBuy.AutoSize = true;
            this.ckbLimitBuy.Location = new System.Drawing.Point(284, 83);
            this.ckbLimitBuy.Name = "ckbLimitBuy";
            this.ckbLimitBuy.Size = new System.Drawing.Size(54, 21);
            this.ckbLimitBuy.TabIndex = 56;
            this.ckbLimitBuy.Text = "limit";
            this.ckbLimitBuy.UseVisualStyleBackColor = true;
            this.ckbLimitBuy.CheckedChanged += new System.EventHandler(this.ckbLimitBuy_CheckedChanged);
            // 
            // ckbLimitSell
            // 
            this.ckbLimitSell.AutoSize = true;
            this.ckbLimitSell.Location = new System.Drawing.Point(283, 120);
            this.ckbLimitSell.Name = "ckbLimitSell";
            this.ckbLimitSell.Size = new System.Drawing.Size(54, 21);
            this.ckbLimitSell.TabIndex = 57;
            this.ckbLimitSell.Text = "limit";
            this.ckbLimitSell.UseVisualStyleBackColor = true;
            this.ckbLimitSell.CheckedChanged += new System.EventHandler(this.ckbLimitSell_CheckedChanged);
            // 
            // dataGridView1
            // 
            this.dataGridView1.AutoGenerateColumns = false;
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.priceDataGridViewTextBoxColumn,
            this.quantityDataGridViewTextBoxColumn});
            this.dataGridView1.DataSource = this.simpleOrderBindingSource;
            this.dataGridView1.Location = new System.Drawing.Point(567, 222);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowTemplate.Height = 24;
            this.dataGridView1.Size = new System.Drawing.Size(329, 209);
            this.dataGridView1.TabIndex = 58;
            // 
            // priceDataGridViewTextBoxColumn
            // 
            this.priceDataGridViewTextBoxColumn.DataPropertyName = "Price";
            this.priceDataGridViewTextBoxColumn.HeaderText = "Price";
            this.priceDataGridViewTextBoxColumn.Name = "priceDataGridViewTextBoxColumn";
            // 
            // quantityDataGridViewTextBoxColumn
            // 
            this.quantityDataGridViewTextBoxColumn.DataPropertyName = "Quantity";
            this.quantityDataGridViewTextBoxColumn.HeaderText = "Quantity";
            this.quantityDataGridViewTextBoxColumn.Name = "quantityDataGridViewTextBoxColumn";
            // 
            // simpleOrderBindingSource
            // 
            this.simpleOrderBindingSource.DataSource = typeof(CryptsyApi.SimpleOrder);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(949, 443);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.ckbLimitSell);
            this.Controls.Add(this.ckbLimitBuy);
            this.Controls.Add(this.label25);
            this.Controls.Add(this.removeSellLimitTextBox);
            this.Controls.Add(this.label26);
            this.Controls.Add(this.label23);
            this.Controls.Add(this.removeBuyLimitTextBox);
            this.Controls.Add(this.label24);
            this.Controls.Add(this.label19);
            this.Controls.Add(this.removeSellPriceTextBox);
            this.Controls.Add(this.label20);
            this.Controls.Add(this.removeBuyPrice);
            this.Controls.Add(this.label21);
            this.Controls.Add(this.label22);
            this.Controls.Add(this.removeFromSellBtn);
            this.Controls.Add(this.removeFromBuyBtn);
            this.Controls.Add(this.label17);
            this.Controls.Add(this.sellLimitTextBox);
            this.Controls.Add(this.label18);
            this.Controls.Add(this.label16);
            this.Controls.Add(this.buyLimitTextBox);
            this.Controls.Add(this.label15);
            this.Controls.Add(this.butSellBtn);
            this.Controls.Add(this.sellSplitTextBox);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.sellValueTextBox);
            this.Controls.Add(this.putBuyBtn);
            this.Controls.Add(this.buySplitTextBox);
            this.Controls.Add(this.label11);
            this.Controls.Add(this.buyValueTextBox);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.sellLimit);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.buyLimit);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.cancelSellBtn);
            this.Controls.Add(this.CancelBuyBtn);
            this.Controls.Add(this.autosellCkb);
            this.Controls.Add(this.autobuyCkb);
            this.Controls.Add(this.logBox);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.autosellTxb);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.autobuyTxb);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.comboBox1);
            this.Name = "MainForm";
            this.Text = "Form1";
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.MainForm_FormClosed);
            this.Load += new System.EventHandler(this.Form1_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.simpleOrderBindingSource)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label coinName;
        private System.Windows.Forms.Label coinAval;
        private System.Windows.Forms.ComboBox comboBox1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox autobuyTxb;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox autosellTxb;
        private System.Windows.Forms.RichTextBox logBox;
        private System.Windows.Forms.CheckBox autobuyCkb;
        private System.Windows.Forms.CheckBox autosellCkb;
        private System.Windows.Forms.Button CancelBuyBtn;
        private System.Windows.Forms.Button cancelSellBtn;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox buyLimit;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.TextBox sellLimit;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label coinTotal;
        private System.Windows.Forms.Label coinHeld;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label btcTotal;
        private System.Windows.Forms.Label btcHeld;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.Label btcAvailable;
        private System.Windows.Forms.TextBox buyValueTextBox;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.TextBox buySplitTextBox;
        private System.Windows.Forms.Button putBuyBtn;
        private System.Windows.Forms.Button butSellBtn;
        private System.Windows.Forms.TextBox sellSplitTextBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox sellValueTextBox;
        private System.Windows.Forms.Label label15;
        private System.Windows.Forms.TextBox buyLimitTextBox;
        private System.Windows.Forms.Label label16;
        private System.Windows.Forms.Label label17;
        private System.Windows.Forms.TextBox sellLimitTextBox;
        private System.Windows.Forms.Label label18;
        private System.Windows.Forms.Label label19;
        private System.Windows.Forms.TextBox removeSellPriceTextBox;
        private System.Windows.Forms.Label label20;
        private System.Windows.Forms.TextBox removeBuyPrice;
        private System.Windows.Forms.Label label21;
        private System.Windows.Forms.Label label22;
        private System.Windows.Forms.Button removeFromSellBtn;
        private System.Windows.Forms.Button removeFromBuyBtn;
        private System.Windows.Forms.Label label23;
        private System.Windows.Forms.TextBox removeBuyLimitTextBox;
        private System.Windows.Forms.Label label24;
        private System.Windows.Forms.Label label25;
        private System.Windows.Forms.TextBox removeSellLimitTextBox;
        private System.Windows.Forms.Label label26;
        private System.Windows.Forms.CheckBox ckbLimitBuy;
        private System.Windows.Forms.CheckBox ckbLimitSell;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.DataGridViewTextBoxColumn priceDataGridViewTextBoxColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn quantityDataGridViewTextBoxColumn;
        private System.Windows.Forms.BindingSource simpleOrderBindingSource;
    }
}

