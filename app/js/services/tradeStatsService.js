app.service('tradeStatsService', ['notifyService',function (notifyService) {
	var newState = {
		maxLength: 100000,
		timelength: 60*20, //5min
		overprovision: 0, // +60s de overprovision pra contar periodos de inatividade e nao parar de analisar durante eles
		buffer: [], 
		Sell: {volume: 0, delta: 0, lastPrice: null},
		Buy: {volume: 0, delta: 0, lastPrice: null},
		lastTrade: null,
		lastPrice: null,
		priceDelta: null
	};

    var state = JSON.parse(JSON.stringify(newState))
	var oldStates = [state];
	var nStates = 0;

	var consolidate = function(data){
		var result = { sellVolume: 0, buyVolume: 0, minPrice: 99999, maxPrice: 0 };
		for (var i = 0; i < data.length; i++) {
			result.sellVolume += data[i].Sell.volume;
			result.buyVolume += data[i].Buy.volume;
		}

		return result;
	};

	var svc = {
   		push: function(data){
			state.buffer.push(data.trade);

			var minDate = data.trade.timestamp - state.timelength;
			var minIndex = 0;

			for (var i = 0; i < state.buffer.length; i++){
				if (state.buffer[i].timestamp >= minDate){
					break;
				}

				minIndex++;
			}

			if (minIndex > 0){
				state.buffer = state.buffer.splice(minIndex);
			}
		},
		lastTrade: function() {
			return state.buffer[state.buffer.length-1];
		},
		recalc: function(period, end, older){
			if (!end){
				end = 0;
			}

			if (!older){
				older = JSON.parse(JSON.stringify(newState));
			}

			var summary = JSON.parse(JSON.stringify(newState));
			summary.Sell.volume = 0;
			summary.Sell.delta = 0;
			summary.Buy.volume = 0;
			summary.Buy.delta = 0;

            var maxDate = (new Date().getTime() / 1000) - end;
			var minDate = maxDate - period;
			var lastTrade = {};

			var priceMin=9999999999, priceMax=0;
			for (var i = state.buffer.length -1; i >= 0; i--) {
				var item = state.buffer[i];

				if (item.timestamp > maxDate)
					continue;

				if (item.timestamp < minDate)
					break;

				var vol = item.total-0;
				summary[item.type].volume += vol;
				lastTrade = state.buffer[i];
				
				var price = item.price-0;
				priceMax = Math.max(priceMax, price);
				priceMin = Math.min(priceMin, price);
			};

			summary.Buy.delta = (summary.Buy.volume / older.Buy.volume)-1;
			summary.Sell.delta = (summary.Sell.volume / older.Sell.volume)-1;
			summary.lastTrade = lastTrade;
			summary.lastPrice = summary.lastTrade.price;
			summary.maxPrice = priceMax;
			summary.minPrice = priceMin;
			summary.priceDelta = (priceMax/priceMin)-1; // fica certo em dump isso?
			return summary;
		},
		deltaT: function(){
			if (!this.lastTrade()) return 0;
			return this.lastTrade().timestamp - state.buffer[0].timestamp;
		},
		getState: function() {
			var previous1 = this.recalc(60, 60);
			var last1 = this.recalc(60, 0, previous1);

			var previous5 = this.recalc(300, 300);
			var last5 = this.recalc(300, 0, previous5);

			var previous10 = this.recalc(600, 600);
			var last10 = this.recalc(600, 0, previous10);

			return {
				last1: last1, 
				last5: last5, 
				last10: last10, 
				previous10: previous10
			};
		}
	};

	return svc;
}]);