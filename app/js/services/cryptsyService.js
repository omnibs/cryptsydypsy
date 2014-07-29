app.service('cryptsyService', [function () {
	return {
		bind: function(market, callback) {
			if (!("Pusher" in window)) throw "Pusher not loaded";
		  	
		  	var pusher = new Pusher('cb65d0a7a72cd94adf1f', {encrypted: true});
			var channel = pusher.subscribe('ticker.' + market);
			channel.bind("message", callback);
		}
	};
}]);