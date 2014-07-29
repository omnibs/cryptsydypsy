app.service('detectorService', ['notifyService',function (notifyService) {
	var state = {
		maxLength: 100000,
		timelength: 60*5, //5min
		overprovision: 60, // +60s de overprovision pra contar periodos de inatividade e nao parar de analisar durante eles
		buffer: [], 
		Sell: {volume: 0, delta: 0, lastPrice: null},
		Buy: {volume: 0, delta: 0, lastPrice: null},
		lastTrade: null,
		lastPrice: null,
		priceDelta: null
	};
	
	var oldState = state;

	var svc = {
		push: function(data){
			state.buffer.push(data.trade);

			var overflown = state.buffer.length - state.maxLength;
			if (overflown > 0)
				state.buffer.splice(state.maxLength, overflown);
			
			this.removeOlder();

			this.recalc();
			window.a = state;
		},
		lastTrade: function() {
			return state.buffer[state.buffer.length-1];
		},
		recalc: function(){
			state.Sell.volume = 0;
			state.Sell.delta = 0;
			state.Buy.volume = 0;
			state.Buy.delta = 0;

			var priceMin=9999999999, priceMax=0;
			for (var i = 0; i < state.buffer.length; i++) {
				var item = state.buffer[i];

				var vol = item.total-0;
				state[item.type].volume += vol;
				
				var price = item.price-0;
				priceMax = Math.max(priceMax, price);
				priceMin = Math.min(priceMin, price);
			};

			state.Buy.delta = (state.Buy.volume / oldState.Buy.volume)-1;
			state.Sell.delta = (state.Sell.volume / oldState.Sell.volume)-1;
			state.lastTrade = this.lastTrade();
			state.lastPrice = state.lastTrade.price;
			state.maxPrice = priceMax;
			state.minPrice = priceMin;
			state.priceDelta = (priceMax/priceMin)-1; // fica certo em dump isso?
		},
		deltaT: function(){
			if (!this.lastTrade()) return 0;
			return this.lastTrade().timestamp - state.buffer[0].timestamp;
		},
		check: function(){
			// se nao tem 1min rodando nao contabiliza
			if (this.deltaT() < state.timelength) {
				console.log('Tempo capturado no buffer insuficiente para analise');
				return;
			}
			// se aumentou mais de 10% volume em 10 segundos == pump/dump? axo q nao neh, mas vai por enquanto
			var delta = state.Buy.delta;
			var abs = state.Buy.volume - oldState.Buy.volume;
			
			if (false && delta > 0.1) // mto falso positivo
				notifyService.notify('Pump?', 'Delta de volume em 10s \r\n' 
					+ (delta*100).toFixed(2) + '%\r\n'
					+ abs.toFixed(8) + ' BTC');
			
			if (abs > 20)
				notifyService.notify('Pump?', 'Volume em 10s > 20btc: \r\n' 
					+ abs.toFixed(8) + ' BTC');
			

			delta = state.Sell.delta;
			abs = state.Buy.volume - oldState.Buy.volume;
			if (false && delta > 0.1) // mto falso positivo
				notifyService.notify('Dump?', 'Delta de volume em 10s \r\n' 
					+ (delta*100).toFixed(2) + '%\r\n'
					+ abs.toFixed(8) + ' BTC');

			if (abs > 20)
				notifyService.notify('Dump?', 'Volume em 10s > 20btc: \r\n' 
					+ abs.toFixed(8) + ' BTC');

			delta = state.priceDelta;
			var deltaChange = delta / oldState.priceDelta;
			abs = state.maxPrice - state.minPrice;
			if (delta >= 0.05 && delta != Infinity && deltaChange > 0.01)
				notifyService.notify('Pump?', 'Delta de preço em 5min aumentou \r\n' 
					+ (delta*100).toFixed(2) + '%\r\n'
					+ abs.toFixed(8) + ' BTC');

			if (delta <= -0.05 && delta != Infinity && deltaChange > 0.01)
				notifyService.notify('Dump?', 'Delta de preço em 5min caiu \r\n' 
					+ (delta*-100).toFixed(2) + '%\r\n'
					+ (-abs).toFixed(8) + ' BTC');
		},
		getState: function() {
			return {
				sell: state.Sell, 
				buy: state.Buy,
				lastTrade: state.lastTrade, 
				lastPrice: state.lastPrice, 
				priceDelta: state.priceDelta,
				deltaT: this.deltaT(),
				timelength: state.timelength
			};
		},
		removeOlder: function() {
			var lastStamp = this.lastTrade().timestamp;
			state.buffer = state.buffer.filter(function(v){
				var delta = lastStamp - v.timestamp;
				return delta <= state.timelength+state.overprovision;
			});
		}
	};

	setInterval(function() {
		oldState = JSON.parse(JSON.stringify(state));

		//svc.removeOlder();
		//svc.recalc();
		svc.check();
	},10000);

	return svc;
}]);