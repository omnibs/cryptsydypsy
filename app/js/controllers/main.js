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
		cryptsyService.bindUserData($routeParams.userid, function(data) {
			var call = userService.push(data);
			call.then(function(result){
				$scope.userData = result;
			});
		});
	}

	$scope.tab = 'last1';
}]);