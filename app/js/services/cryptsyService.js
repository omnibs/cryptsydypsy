app.service('cryptsyService', ['$http', '$interval', '$window', '$location', function ($http, $interval, $window, $location) {
	return {
		bindChat: function(callback){
			if (!("Pusher" in window)) throw "Pusher not loaded";

			var pusher2 = new Pusher('41629b0417bad133acb8');
            var chatchannel = pusher2.subscribe('chat');
            chatchannel.bind('message', callback);
		},
		bindUserData: function(userId, callback){
			if (!("Pusher" in window)) throw "Pusher not loaded";

			var pusher = new Pusher('37c5733bcd7279503510');
            var userChannel = pusher.subscribe('user' + userId);
            userChannel.bind('message', callback);
		},		
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