app.controller('mainCtl', ['$scope', 'notifyService','cryptsyService', 'tradeStatsService','orderbookStatsService','detectionService', 'market'
,function($scope, notifyService, cryptsyService, tradeStatsService, orderbookStatsService, detectionService, market) {
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
	$scope.tab = 'last1';
}]);