app.service('detectionService', ['notifyService', 'tradeStatsService', 'orderbookStatsService',
	function (notifyService, tradeStatsService, orderbookStatsService) {
	var cooldown = {};
	var alertSound = 'http://soundbible.com/grab.php?id=81&type=mp3';
	var warningSound = 'http://soundbible.com/grab.php?id=2017&type=mp3';

	return {
		process:function() {
			this.fakeWallMovida();
			this.dump();
			this.pump();
		},
		fakeWallMovida: function() {
			var state = orderbookStatsService.getState();

			if (cooldown.fakeWallMovida || !state.cumulative || !state.cumulative.last1) return;
			var bigmoves = state.cumulative.last1
			.map(function(v,i) {
				return {v:v,p:i};
			})
			.filter(function (v, i) {
				return v.v > 12 && v.p >= state.curBuy * 0.8 && v.p <= state.curSell * 1.2;
			});

			if (bigmoves.length > 0){
				var msg = 'Movimentação grande nestes preços:\r\n'
				+ bigmoves.map(function(v) { return 'P: ' + v.p + '| QTD:' + v.v}).join('\r\n');
				notifyService.notify('Fake Wall', msg, warningSound);
				cooldown.fakeWallMovida = true;

				setTimeout(function(arguments) {
					cooldown.fakeWallMovida = false;
				},1000*60);
			}
		},
		pump: function(){
			var state = tradeStatsService.getState();
			if (cooldown.pump || !state.cumulative || !state.cumulative.last1) return;

			if (state.last5.Buy.volume > 10) {

				var msg = 'Movimentação grande e súbita:\r\n' + state.last1.Buy.volume;
				notifyService.notify('Pump?', msg, alertSound);
				cooldown.pump = true;

				setTimeout(function(arguments) {
					cooldown.pump = false;
				},1000*60);
			}
		},
		dump: function(){
			if (cooldown.dump) return;

			var state = tradeStatsService.getState();

			if (state.last5.Sell.volume > 10) {

				var msg = 'Movimentação grande e súbita:\r\n' + state.last1.Sell.volume;
				notifyService.notify('Dump?', msg, alertSound);
				cooldown.dump = true;

				setTimeout(function(arguments) {
					cooldown.dump = false;
				},1000*60);
			}
		}
	}
}]);