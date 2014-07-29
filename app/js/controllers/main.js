app.controller('mainCtl', ['$scope', 'notifyService','cryptsyService', 'detectorService',function($scope, notifyService, cryptsyService, detectorService) {
	$scope.grantPermission = function() {
		notifyService.allow();
	}
	$scope.notifyAllowed = notifyService.isAllowed();

	cryptsyService.bind(169, function(data) {
		detectorService.push(data);
		$scope.model = data;
		$scope.$apply();
	});
}]);