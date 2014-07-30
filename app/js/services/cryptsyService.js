app.service('cryptsyService', ['$http', '$interval', '$window', function ($http, $interval, $window) {
	return {
		bind: function(market, callback) {
			if (!("Pusher" in window)) throw "Pusher not loaded";
		  	
		  	var pusher = new Pusher('cb65d0a7a72cd94adf1f', {encrypted: true});
			var channel = pusher.subscribe('trade.' + market);
			channel.bind("message", callback);
		},
		bindOrderbook: function(market, myCallback) {
			$interval(function() {
				window.callback = function function_name (data) {
					myCallback(data);
				}

				var url = "http://jsonp.guffa.com/Proxy.ashx?url=" + encodeURIComponent('http://pubapi.cryptsy.com/api.php?method=singleorderdata&marketid='+market);
				$http.jsonp(url).success(callback);
			}, 1000);
		}
	};
}]);