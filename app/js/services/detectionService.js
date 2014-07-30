app.service('detectionService', ['notifyService', 'tradeStatsService', 'orderbookStatsService',
	function (notifyService, tradeStatsService, orderbookStatsService) {
	var cooldown = {};
	return {
		process:function() {
			this.fakeWallMovida();
			this.dump();
			this.pump();
		},
		fakeWallMovida: function() {
			if (cooldown.fakeWallMovida || !state.cumulative.last1) return;
			var state = orderbookStatsService.getState();
			
			var bigmoves = state.cumulative.last1
			.map(function(v,i) {
				return {v:v,p:i};
			})
			.filter(function (v, i) {
				return v.v > 20;
			});

			if (bigmoves.length > 0){
				var msg = 'Movimentação grande nestes preços:\r\n'
				+ bigmoves.map(function(v) { return 'P: ' + v.p + '| QTD:' + v.v}).join('\r\n');
				notifyService.notify('Fake Wall', msg);
				cooldown.fakeWallMovida = true;

				setTimeout(function(arguments) {
					cooldown.fakeWallMovida = false;
				},1000*60);
			}
		},
		pump: function(){
			if (cooldown.pump || !state.cumulative.last1) return;

			var state = tradeStatsService.getState();

			if ((state.last1.Buy.volume / state.previous10.Buy.volume) >= 1
				&& state.last5.Buy.volume > 10
				&& state.last1.Buy.volume > state.last1.Sell.volume) {

				var msg = 'Movimentação grande e súbita:\r\n' + state.last1.Buy.volume;
				notifyService.notify('Pump?', msg);
				cooldown.pump = true;

				setTimeout(function(arguments) {
					cooldown.pump = false;
				},1000*60);
			}
		},
		dump: function(){
			if (cooldown.dump) return;

			var state = tradeStatsService.getState();

			if ((state.last1.Buy.volume / state.previous10.Sell.Volume) >= 1
				&& state.last5.Sell.volume > 10
				&& state.last1.Buy.volume < state.last1.Sell.volume) {

				var msg = 'Movimentação grande e súbita:\r\n' + state.last1.Sell.volume;
				notifyService.notify('Dump?', msg);
				cooldown.dump = true;

				setTimeout(function(arguments) {
					cooldown.dump = false;
				},1000*60);
			}
		}
	}
}]);