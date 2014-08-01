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