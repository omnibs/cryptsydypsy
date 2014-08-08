app.service('userService', ['notifyService', '$q', '$http',function (notifyService, $q, $http) {
	var baseUrl = 'http://localhost:777/api/';
	var svc = {
		getInfo:function(data) {
            var deferred = $q.defer();

            $http.get(baseUrl +'cryptsy/getInfo()')
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