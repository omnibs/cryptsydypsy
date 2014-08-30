app.service('orderbookStatsService', ['notifyService',function (notifyService) {
	var state = {
		curSell: null,
		curBuy: null,
		buffer: [],
		delta: {},
		cumulative: {},
		maxlength: 60*10,
		orderbook: {}
	};

	var svc = {
		push:function(data) {
			var array = data.return.RDD.sellorders
							.map(function(v){v.type="sell";return v;})
							.concat(data.return.RDD.buyorders
									.map(function(v){v.type="buy";return v;}));

			var orders = this.toOrderArray(array);
			state.buffer.push(orders);

			var overflown = state.buffer.length - state.maxLength;
			if (overflown > 0)
				state.buffer.splice(state.maxLength, overflown);

			state.curSell = data.return.RDD.sellorders[0].price.replace('.','')-0;
			state.curBuy = data.return.RDD.buyorders[0].price.replace('.','')-0;
			this.recalc(data);
		},
		getState: function() {
			return state;
		},
		recalc:function(orderBookData) {
			if (state.buffer.length < 1)
				return;
			var self = this;
			var create = function(name, qtd) {
				var items = state.buffer.concat().splice(-qtd,qtd);
				state.delta[name] = self.diff(items);
				state.cumulative[name] = self.cumulative(items);

				state.orderbook[name] = state.buffer[state.buffer.length-1].orders.map(function(v, i){
					return {
						price: i,
						value: v,
						delta: state.delta[name][i],
						cumulative: state.cumulative[name][i],
						acc : self.orderAcc(i, orderBookData)
					};
				}).filter(function(v){return !!v.price;});
			}

			create('instant', 2);
			create('last1', 60);
			create('last5', 60*5);
			create('last10', 60*10);
		},
		diff: function(items) {
			var latest = items[items.length-1].orders.concat();
			var oldest = items[0].orders;

			for (var i = 0; i < latest.length; i++) {
				latest[i] = (latest[i] || 0) - (oldest[i] || 0);
			};

			return latest;
		},
		cumulative: function(data) {
			var r = [];
			for (var i = data.length-1; i > 0; i--) {
				var cur = data[i].orders;
				var prev = data[i-1].orders;

				for (var j = 0; j < Math.max(cur.length, prev.length); j++) {
					r[j] = (r[j] || 0) + Math.abs(cur[j] - prev[j]);
				};
			};

			return r;
		},
		orderAcc: function(price, items){
			var acc = 0;
			var orders = [];
			if (price <=  state.curBuy){
				orders = items.return.RDD.buyorders;
			}
			else {
				orders = items.return.RDD.sellorders;
			}

			for (var i in orders){
				acc = acc + (orders[i].total -0);
				orderPrice =  orders[i].price.replace('.','') - 0;

				if ((price <=  state.curBuy && orderPrice <= price) ||
				 (price >= state.curSell && orderPrice >= price)){
					break;
				}
			}

			return acc;
		},
		toOrderArray: function(data) {
			var array = [];
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var idx = item.price.replace('.','')-0;
				var total = item.total-0;
				var multiplier = data.type == "sell" ? -1 : 1;
				array[idx] = total * multiplier;
			};

			return {timestamp: new Date().getTime(), orders: array};
		}
	};

	return svc;
}]);