app.filter('orderStuff', [function () {
    return function (items, order, stopOrStart) {
        if (!angular.isUndefined(items)) {
           	if (order == 'asc')
           		return items.concat().splice(stopOrStart-1);

           	else
				return items.concat().splice(0, stopOrStart).reverse();

        } else {
            return item;
        }
    };
}]);