app.controller('mainCtl', ['$scope', 'notifyService',function($scope, notifyService) {
	$scope.grantPermission = function() {
		notifyService.allow();
	}
	$scope.notifyAllowed = notifyService.isAllowed();
}]);