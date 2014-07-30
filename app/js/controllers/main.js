app.controller('mainCtl', ['$scope', 'notifyService','cryptsyService', 'tradeStatsService','orderbookStatsService',
function($scope, notifyService, cryptsyService, tradeStatsService, orderbookStatsService) {
	$scope.grantPermission = function() {
		notifyService.allow();
	}
	$scope.notifyAllowed = notifyService.isAllowed();

	cryptsyService.bind(169, function(data) {
		tradeStatsService.push(data);
		$scope.model = tradeStatsService.getState();
		$scope.$apply();
	});
	cryptsyService.bindOrderbook(169, function(data) {
		orderbookStatsService.push(data);
		$scope.orderState = orderbookStatsService.getState();
	});
	$scope.tab = 'instant';
}]);