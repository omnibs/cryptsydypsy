app.service('chatService', ['notifyService',function (notifyService) {
	var svc = {
		push:function(data) {
			var userhandle = '<span onclick="replyto(\'' + data.handle + '\')" ondblclick="chatoptions(\'' + data.handle + '\')" style="cursor:pointer;">' + data.handle + '</span>';

			if (data.modstatus == 3)
			{
				msg = "<b><span style='color:green;'>" + userhandle + "</span></b><br /><span style='color:#666666;'><i>" + data.text + "</i></span>";
			}
			else if (data.modstatus == 1)
			{
			
				if (data.handle == 'NetworkAdmin')
				{
					msg = "<b><span style='color:#800080;'>" + userhandle + "</span></b><br /><span style='color:#666666;'>" + data.text + "</span>";
				}
				else
				{
					msg = "<b><span style='color:blue;'>" + userhandle + "</span></b><br /><span style='color:#666666;'>" + data.text + "</span>";
				}
			
			}
			else if (data.modstatus == 2)
			{
				msg = "<b><span style='color:red;'>" + userhandle + "</span></b><br /><span style='color:#666666;'>" + data.text + "</span>";
			}
			else
			{				
				msg = "<b>" + userhandle + "</b><br /><span style='color:#666666;'>" + data.text + "</span>";
			}
			
			var chatcontent = "<div style='padding: 2px; padding-top:5px; padding-bottom:5px; border-bottom:1px solid #cccccc;'>" + msg + "</div>";

			var innheight = $('#chatcontent').innerHeight();
			var scrtop = $('#chatcontent').scrollTop();
			var scrheight2 = $("#chatcontent").get(0).scrollHeight;

			var totheight = innheight + scrtop;

			var atbottom = false;
			if (totheight == scrheight2)
			{
				atbottom = true;
			}

			$('#chatcontent').append(chatcontent);
			if (atbottom)
			{
				$("#chatcontent").animate({ scrollTop: $("#chatcontent")[0].scrollHeight}, 800);	
			}
        }
	};

	return svc;
}]);