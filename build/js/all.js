
/*================================================================
=>                  App = ngDump
==================================================================*/
/*global angular*/

var app = angular.module('ngDump', ["ngCookies", "ngRoute", "ngAnimate", "Timeless"]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', '$provide', function ($routeProvider, $locationProvider, $httpProvider, $provide) {
	'use strict';

	$provide.constant('market', { id: 169});

	$routeProvider
		.when('/home/:userid', {
			controller: 'mainCtl',
			templateUrl: 'templates/home.html'
		})
		.when('/home', {
			controller: 'mainCtl',
			templateUrl: 'templates/home.html'
		})
		.otherwise({
			redirectTo: '/home'
		});

	$locationProvider.hashPrefix('!');

	// This is required for Browser Sync to work poperly
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);


/*================================================================
=>                  ngDump App Run()  
==================================================================*/

app.run(['$rootScope', function ($rootScope) {
	
	'use strict';

	console.log('Angular.js run() function...');
}]);




/* ---> Do not delete this comment (Values) <--- */

/* ---> Do not delete this comment (Constants) <--- */
app.controller('mainCtl', ['$scope', 'notifyService','cryptsyService', 'tradeStatsService','orderbookStatsService','detectionService', 'chatService',
 'userService', 'market', '$routeParams'
,function($scope, notifyService, cryptsyService, tradeStatsService, orderbookStatsService, detectionService, chatService, userService,
   market, $routeParams) {
	$scope.grantPermission = function() {
		notifyService.allow();
	}
	$scope.notifyAllowed = notifyService.isAllowed();

	cryptsyService.bind(market.id, function(data) {
		tradeStatsService.push(data);
		$scope.model = tradeStatsService.getState();
		$scope.$apply();
		detectionService.process();
	});
	cryptsyService.bindOrderbook(market.id, function(data) {
		orderbookStatsService.push(data);
		$scope.orderState = orderbookStatsService.getState();
		detectionService.process();
	});
	cryptsyService.bindChat(function(data) {
		chatService.push(data);
	});

	if ($routeParams.userid) {		
		var updateBalances = function(data) {
			var call = userService.getInfo(data);
			call.then(function(result){
				$scope.userData = result;
			});
		}

		cryptsyService.bindUserData($routeParams.userid, updateBalances);
		updateBalances();
	}

	$scope.tab = 'last1';
}]);
app.directive('colored', function() {
	return {
		transclude: true,
		restrict: 'E',
		template: '<td ng-transclude></td>',
		scope: {
			value: '='
		},
		link: function(scope, elm, attrs) {
	  		scope.$watch(scope.value, function(value) {

				if (value-0 < 0)
					elm.css('color', '#F00');
				if (value-0 > 0)
					elm.css('color', '#0F0');
				if (value-0 === 0)
					elm.css('color', '#000');

				elm.text(scope.value);
			});

		}
	};
});
(function() {
  'use strict';

  angular.module("Timeless", [])
    .directive('timeless', function() {

      var Timeless;
      Timeless = {
        times: {
          year: 31557600000, month: 2629800000, week: 604800000,
          day: 86400000, hour: 3600000, minute: 60000, second: 1000
        },
        labels: {
          past: ['ago'],
          future: ['in'],
          year: ['yr', 'yrs'],
          month: ['month', 'months'],
          week: ['wk', 'wk'],
          day: ['d', 'd'],
          hour: ['h', 'h'],
          minute: ['min', 'min'],
          second: ['s', 's'],
          prefix: '',
          suffix: '',
          updateInterval: 1000,
          timeType: {
            auto: 0,
            month: 1,
            week: 2,
            day: 3,
            hour: 4,
            minute: 5,
            second: 6
          }
        },
        epoch: function () {
          return Date.now();
        },
        difference: function (time) {
          return this.epoch() - time;
        },
        estimate: function (date) {
          var diff = this.difference(date)
            , ago
            , future
            , time
            , result = [];

          for (time in this.times) {
            if (diff >= this.times[time]) {
              ago = Math.floor(diff / this.times[time]);
              time = Timeless.labels[time][ago > 1 ? 1 : 0];
              result.push(
                Timeless.labels.prefix
                + ' '
                + ago
                + ''
                + time
                + ' '
                + Timeless.labels.past
                + ' '
                + Timeless.labels.suffix
              );
            }
            else if (diff < 0 && diff <= this.times[time]) {
              future = Math.abs(Math.floor(diff / this.times[time]));
              if (future > 1) {
                time = Timeless.labels[time][1];
                result.push(
                  Timeless.labels.prefix
                  + ' '
                  + Timeless.labels.future
                  + ' '
                  + future
                  + ' '
                  + time
                  + ' '
                  + Timeless.labels.suffix
                );
              }
            }
          }
          return result;
        },
        isValid: function(timeItem) {
          return Object.keys(timeItem);
        }

      };

    var applies = [];
    setInterval(function () {
      if (applies && applies.length > 0){
        for (var i = 0; i < applies.length; i++){
          var fun = applies[i].fn;
          fun();
        }
      }
    }, 1000);

    var guid = (function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
      }
      return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
      };
    })();

    return {
      transclude: true,
      restrict: 'E',
      replace: true,
      template: '<span ng-transclude></span>',
      scope: {
          time: '=',
          options: '=',
          type: '='
      },
      link: function(scope, element, attrs) {
        console.log("created: " + scope.$id);
        angular.extend(Timeless.labels, scope.options);
        var estimateTime = Timeless.estimate(typeof scope.time === 'string' ? new Date(scope.time) : scope.time)
          , setTimeType;

        if (typeof estimateTime[Timeless.labels.timeType[scope.type]] == 'undefined') {
          setTimeType = Timeless.labels.timeType.auto;
        }
        else {
          setTimeType = Timeless.labels.timeType[scope.type];
        }
        setTimeout(function() {
            element.text(estimateTime[setTimeType]);
        }, 1);

        scope.refreshFn = {
          id: scope.$id, 
          fn: function() {
            scope.$apply(function () {
              var estimateTime = Timeless.estimate(typeof scope.time === 'string' ? new Date(scope.time) : scope.time);
              element.text(estimateTime[setTimeType]);
            });
          }
        };
        applies.push(scope.refreshFn);
        console.log('length: ' + applies.length);

        scope.$on('$destroy', function() {
          console.log("destroy: " + scope.$id);
          for (var i = 0; i < applies.length; i++) {
            var item = applies[i];
            if (item.id == scope.$id){
              applies.splice(i, 1);
              console.log('matamos: ' + scope.$id);
              console.log('length: ' + applies.length);
            }
          };
        });
      }
    };
  });

}());

app.filter('orderStuff', [function () {
    return function (items, order, stopOrStart) {
        if (!angular.isUndefined(items)) {
           	if (order == 'asc')
           		return items.filter(function (v) { return v.price >= stopOrStart });
           	else
              return items.filter(function (v) { return v.price <= stopOrStart }).reverse();
        } else {
            return item;
        }
    };
}]);
app.service('chatService', ['notifyService',function (notifyService) {
	var svc = {
		push:function(data) {
			var userhandle = '<span onclick="replyto(\'' + data.handle + '\')" ondblclick="chatoptions(\'' + data.handle + '\')" style="cursor:pointer;">' + data.handle + '</span>';

			if (data.modstatus == 3)
			{
				msg = "<b><span style='color:green;'>" + userhandle + "</span></b><br /><span style='color:#666666;'><i>" + data.text + "</i></span>";
			}
			else if (data.modstatus == 1)
			{
			
				if (data.handle == 'NetworkAdmin')
				{
					msg = "<b><span style='color:#800080;'>" + userhandle + "</span></b><br /><span style='color:#666666;'>" + data.text + "</span>";
				}
				else
				{
					msg = "<b><span style='color:blue;'>" + userhandle + "</span></b><br /><span style='color:#666666;'>" + data.text + "</span>";
				}
			
			}
			else if (data.modstatus == 2)
			{
				msg = "<b><span style='color:red;'>" + userhandle + "</span></b><br /><span style='color:#666666;'>" + data.text + "</span>";
			}
			else
			{				
				msg = "<b>" + userhandle + "</b><br /><span style='color:#666666;'>" + data.text + "</span>";
			}
			
			var chatcontent = "<div style='padding: 2px; padding-top:5px; padding-bottom:5px; border-bottom:1px solid #cccccc;'>" + msg + "</div>";

			var innheight = $('#chatcontent').innerHeight();
			var scrtop = $('#chatcontent').scrollTop();
			var scrheight2 = $("#chatcontent").get(0).scrollHeight;

			var totheight = innheight + scrtop;

			var atbottom = false;
			if (totheight == scrheight2)
			{
				atbottom = true;
			}

			$('#chatcontent').append(chatcontent);
			if (atbottom)
			{
				$("#chatcontent").animate({ scrollTop: $("#chatcontent")[0].scrollHeight}, 800);	
			}
        }
	};

	return svc;
}]);
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
				},1000*70);
			}
		},
		pump: function(){
			var state = tradeStatsService.getState();
			if (cooldown.pump || !state.cumulative || !state.cumulative.last1) return;

			if (state.last5.Buy.volume > 10) {

				var msg = 'Movimentação grande e súbita:\r\n' + state.last5.Buy.volume;
				notifyService.notify('Pump?', msg, alertSound);
				cooldown.pump = true;

				setTimeout(function(arguments) {
					cooldown.pump = false;
				},2000*60);
			}
		},
		dump: function(){
			if (cooldown.dump) return;

			var state = tradeStatsService.getState();

			if (state.last5.Sell.volume > 10) {

				var msg = 'Movimentação grande e súbita:\r\n' + state.last5.Sell.volume;
				notifyService.notify('Dump?', msg, alertSound);
				cooldown.dump = true;

				setTimeout(function(arguments) {
					cooldown.dump = false;
				},2000*60);
			}
		}
	}
}]);
app.service('notifyService', [function () {
	return {
		isAllowed: function() {
			if (!("Notification" in window)) throw "This browser does not support desktop notification";
		  	
		  	return Notification.permission === "granted";
		},
		allow: function() {
			if (!("Notification" in window)) throw "This browser does not support desktop notification";

			Notification.requestPermission(function (permission) { 
				if(!('permission' in Notification)) {
					Notification.permission = permission;
				}

				var notification = new Notification('All set!', {body: 'Permission granted to notify you about dumps and pumps!'});
			});
		},
		notify: function(title, body, sound) {
			if (!("Notification" in window)) throw "This browser does not support desktop notification";

			if (Notification.permission === "granted") {
    			var notification = new Notification(title, {body: body});

    			if (sound){
    				    new Audio(sound).play();
    			}
  			}
		}
	};
}]);
app.service('orderbookStatsService', ['notifyService',function (notifyService) {
	var state = {
		curSell: null,
		curBuy: null,
		buffer: [],
		delta: {},
		cumulative: {},
		maxlength: 60*10,
		orderbook: {}
	};

	var svc = {
		push:function(data) {
			var array = data.return.RDD.sellorders
							.map(function(v){v.type="sell";return v;})
							.concat(data.return.RDD.buyorders
									.map(function(v){v.type="buy";return v;}));

			var orders = this.toOrderArray(array);
			state.buffer.push(orders);

			var overflown = state.buffer.length - state.maxLength;
			if (overflown > 0)
				state.buffer.splice(state.maxLength, overflown);

			state.curSell = data.return.RDD.sellorders[0].price.replace('.','')-0;
			state.curBuy = data.return.RDD.buyorders[0].price.replace('.','')-0;
			this.recalc(data);
		},
		getState: function() {
			return state;
		},
		recalc:function(orderBookData) {
			if (state.buffer.length < 1)
				return;
			var self = this;
			var create = function(name, qtd) {
				var items = state.buffer.concat().splice(-qtd,qtd);
				state.delta[name] = self.diff(items);
				state.cumulative[name] = self.cumulative(items);

				state.orderbook[name] = state.buffer[state.buffer.length-1].orders.map(function(v, i){
					return {
						price: i,
						value: v,
						delta: state.delta[name][i],
						cumulative: state.cumulative[name][i],
						acc : self.orderAcc(i, orderBookData)
					};
				}).filter(function(v){return !!v.price;});
			}

			create('instant', 2);
			create('last1', 60);
			create('last5', 60*5);
			create('last10', 60*10);
		},
		diff: function(items) {
			var latest = items[items.length-1].orders.concat();
			var oldest = items[0].orders;

			for (var i = 0; i < latest.length; i++) {
				latest[i] = (latest[i] || 0) - (oldest[i] || 0);
			};

			return latest;
		},
		cumulative: function(data) {
			var r = [];
			for (var i = data.length-1; i > 0; i--) {
				var cur = data[i].orders;
				var prev = data[i-1].orders;

				for (var j = 0; j < Math.max(cur.length, prev.length); j++) {
					r[j] = (r[j] || 0) + Math.abs(cur[j] - prev[j]);
				};
			};

			return r;
		},
		orderAcc: function(price, items){
			var acc = 0;
			var orders = [];
			if (price <=  state.curBuy){
				orders = items.return.RDD.buyorders;
			}
			else {
				orders = items.return.RDD.sellorders;
			}

			for (var i in orders){
				acc = acc + (orders[i].total -0);
				orderPrice =  orders[i].price.replace('.','') - 0;

				if ((price <=  state.curBuy && orderPrice <= price) ||
				 (price >= state.curSell && orderPrice >= price)){
					break;
				}
			}

			return acc;
		},
		toOrderArray: function(data) {
			var array = [];
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var idx = item.price.replace('.','')-0;
				var total = item.total-0;
				var multiplier = data.type == "sell" ? -1 : 1;
				array[idx] = total * multiplier;
			};

			return {timestamp: new Date().getTime(), orders: array};
		}
	};

	return svc;
}]);
app.service('tradeStatsService', ['notifyService',function (notifyService) {
	var newState = {
		maxLength: 100000,
		timelength: 60*20, //5min
		overprovision: 0, // +60s de overprovision pra contar periodos de inatividade e nao parar de analisar durante eles
		buffer: [], 
		Sell: {volume: 0, delta: 0, lastPrice: null},
		Buy: {volume: 0, delta: 0, lastPrice: null},
		lastTrade: null,
		lastPrice: null,
		priceDelta: null
	};

    var state = JSON.parse(JSON.stringify(newState))
	var oldStates = [state];
	var nStates = 0;

	var consolidate = function(data){
		var result = { sellVolume: 0, buyVolume: 0, minPrice: 99999, maxPrice: 0 };
		for (var i = 0; i < data.length; i++) {
			result.sellVolume += data[i].Sell.volume;
			result.buyVolume += data[i].Buy.volume;
		}

		return result;
	};

	var svc = {
   		push: function(data){
			data.trade.timeArrived = new Date(); // pra descontar lag/diferenca de tempo entre client e server
			state.buffer.push(data.trade);

			var minDate = data.trade.timestamp - state.timelength;
			var minIndex = 0;

			for (var i = 0; i < state.buffer.length; i++){
				if (state.buffer[i].timestamp >= minDate){
					break;
				}

				minIndex++;
			}

			if (minIndex > 0){
				state.buffer = state.buffer.splice(minIndex);
			}
		},
		lastTrade: function() {
			return state.buffer[state.buffer.length-1];
		},
		recalc: function(period, end, older){
			if (!end){
				end = 0;
			}

			if (!older){
				older = JSON.parse(JSON.stringify(newState));
			}

			var summary = JSON.parse(JSON.stringify(newState));
			summary.Sell.volume = 0;
			summary.Sell.delta = 0;
			summary.Buy.volume = 0;
			summary.Buy.delta = 0;

            var maxDate = (new Date().getTime() / 1000) - end;
			var minDate = maxDate - period;
			var lastTrade = {};

			var priceMin=9999999999, priceMax=0;
			for (var i = state.buffer.length -1; i >= 0; i--) {
				var item = state.buffer[i];

				if ((item.timeArrived.getTime() / 1000) > maxDate)
					continue;

				if ((item.timeArrived.getTime() / 1000) < minDate)
					break;

				var vol = item.total-0;
				summary[item.type].volume += vol;
				lastTrade = state.buffer[i];
				
				var price = item.price-0;
				priceMax = Math.max(priceMax, price);
				priceMin = Math.min(priceMin, price);
			};

			summary.Buy.delta = (summary.Buy.volume / older.Buy.volume)-1;
			summary.Sell.delta = (summary.Sell.volume / older.Sell.volume)-1;
			summary.lastTrade = lastTrade;
			summary.lastPrice = summary.lastTrade.price;
			summary.maxPrice = priceMax;
			summary.minPrice = priceMin;
			summary.priceDelta = (priceMax/priceMin)-1; // fica certo em dump isso?
			return summary;
		},
		deltaT: function(){
			if (!this.lastTrade()) return 0;
			return this.lastTrade().timestamp - state.buffer[0].timestamp;
		},
		getState: function() {
			var previous1 = this.recalc(60, 60);
			var last1 = this.recalc(60, 0, previous1);

			var previous5 = this.recalc(300, 300);
			var last5 = this.recalc(300, 0, previous5);

			var previous10 = this.recalc(600, 600);
			var last10 = this.recalc(600, 0, previous10);

			return {
				last1: last1, 
				last5: last5, 
				last10: last10, 
				previous10: previous10,
				lastTrade: this.lastTrade(),
				lastTrades: state.buffer.concat().splice(-10,10).reverse()
			};
		}
	};

	return svc;
}]);
app.service('userService', ['notifyService', '$q', '$http',function (notifyService, $q, $http) {
	var baseUrl = 'http://localhost:777/api/';
	var svc = {
		getInfo:function(data) {
            var deferred = $q.defer();

            $http.get(baseUrl +'cryptsy/getInfo')
                .success(function (data, status) {
                    deferred.resolve(data);
                })
                .error(function (data, status) {
                	deferred.reject({ error: data.Message });
                });

            return deferred.promise;
		}
	};

	return svc;
}]);