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
			if (cooldown.fakeWallMovida) return;
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
			if (cooldown.pump) return;

			var state = tradeStatsService.getState();

			if ((state.buy1m.volume / state.previous10.buyVolume) >= 2
				&& state.previous10.buyVolume > 3
				&& state.buy1m.volume > state.sell1m.volume) {

				var msg = 'Movimentação grande e súbita:\r\n' + state.buy1m.volume;
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

			if ((state.sell1m.volume / state.previous10.sellVolume) >= 2
				&& state.previous10.sellVolume > 3
				&& state.buy1m.volume < state.sell1m.volume) {

				var msg = 'Movimentação grande e súbita:\r\n' + state.sell1m.volume;
				notifyService.notify('Dump?', msg);
				cooldown.dump = true;

				setTimeout(function(arguments) {
					cooldown.dump = false;
				},1000*60);
			}
		}
	}
}]);