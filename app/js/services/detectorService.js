app.service('detectorService', ['notifyService',function (notifyService) {
	var state = {maxLength: 100};
	var svc = {
		bind: function(callback) {
			state.notify = callback;
		},
		push: function(data){
			state.buffer = state.buffer || [];
			state.buffer.push(data);
			
			var overflown = state.buffer.length - state.maxLength;
			if (overflown > 0)
				state.buffer.splice(state.maxLength, overflown);
			
			this.recalc();
			this.check();
		},
		recalc: function(){
			console.log('ei');
		},
		check: function(){
			console.log('oi');
		}
	};

	return svc;
}]);