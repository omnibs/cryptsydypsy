app.service('detectorService', ['notifyService',function (notifyService) {
	var state = {maxLength: 100, buffer: []};
	var svc = {
		bind: function(callback) {
			state.notify = callback;
		},
		push: function(data){
			state.buffer.push(data);
			window.a = window.a || [];
			a.push(data);
			
			var overflown = state.buffer.length - state.maxLength;
			if (overflown > 0)
				state.buffer.splice(state.maxLength, overflown);
			
			this.recalc();
			this.check();
		},
		recalc: function(){
			console.log(state.buffer.length);
		},
		check: function(){
			console.log('oi');
		}
	};

	return svc;
}]);