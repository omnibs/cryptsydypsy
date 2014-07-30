app.service('notifyService', [function () {
	return {
		isAllowed: function() {
			if (!("Notification" in window)) throw "This browser does not support desktop notification";
		  	
		  	return Notification.permission === "granted";
		},
		allow: function() {
			if (!("Notification" in window)) throw "This browser does not support desktop notification";

			Notification.requestPermission(function (permission) { 
				if(!('permission' in Notification)) {
					Notification.permission = permission;
				}

				var notification = new Notification('All set!', {body: 'Permission granted to notify you about dumps and pumps!'});
			});
		},
		notify: function(title, body, sound) {
			if (!("Notification" in window)) throw "This browser does not support desktop notification";

			if (Notification.permission === "granted") {
    			var notification = new Notification(title, {body: body});

    			if (sound){
    				    new Audio(sound).play();
    			}
  			}
		}
	};
}]);