
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