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