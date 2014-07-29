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

	setInterval(function() {
		oldState = JSON.parse(JSON.stringify(state));
	},10000);

	var svc = {
		push: function(data){
			state.buffer.push(data.trade);
			window.a = window.a || [];
			a.push(data);

			var overflown = state.buffer.length - state.maxLength;
			if (overflown > 0)
				state.buffer.splice(state.maxLength, overflown);
			
			this.removeOlder();

			this.recalc();
			this.check();
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
				state.priceDelta = priceMax/priceMin; // fica certo em dump isso?
			};

			state.Buy.delta = state.Buy.volume / oldState.Buy.volume;
			state.Sell.delta = state.Sell.volume / oldState.Sell.volume;
			state.lastTrade = this.lastTrade();
			state.lastPrice = state.lastTrade.price;
			state.maxPrice = priceMax;
			state.minPrice = priceMin;
		},
		deltaT: function(){
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
			if (delta > 0.1)
				notifyService.notify('Pump?', 'Delta de volume em 10s \r\n' 
					+ (delta*100).toFixed(2) + '%\r\n'
					+ abs.toFixed(8) + ' BTC');
			
			delta = state.Sell.delta;
			abs = state.Buy.volume - oldState.Buy.volume;
			if (delta > 0.1)
				notifyService.notify('Dump?', 'Delta de volume em 10s \r\n' 
					+ (delta*100).toFixed(2) + '%\r\n'
					+ abs.toFixed(8) + ' BTC');

			delta = state.priceDelta;// / oldState.priceDelta;
			abs = state.maxPrice - state.minPrice;
			if (delta >= 0.05)
				notifyService.notify('Pump?', 'Delta de preço em 10s aumentou \r\n' 
					+ (delta*100).toFixed(2) + '%\r\n'
					+ abs.toFixed(8) + ' BTC');

			if (delta <= -0.05)
				notifyService.notify('Dump?', 'Delta de preço em 10s caiu \r\n' 
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

	return svc;
}]);