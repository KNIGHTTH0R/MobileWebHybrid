var App = (function() {

	function Class()
	{
			"use strict";

			var mediaPlayer = new MediaPlayer();
			var currentUser;

      var _public =
			{
            init: init,
						mediaPlayer: mediaPlayer
	    };

      function init()
			{
				View.init();
				mediaPlayer = new MediaPlayer();
				mediaPlayer.init();
    	}

			return _public;
    }

	return Class;

})();

if (this.navigationHandler==null)
{
			this.navigationHandler =
			{
					whenDocumentReady: function()
					{
						console.log("show file upload");
						$('#file-upload-form').removeClass('hide');
					},
					something: function()
					{
						returnSomething("WOHOO");
					},
					returnSomething: function(aString)
					{

					}
			};
}

var app;
$(document).ready( function()
{
		app = new App();
    app.init();
		//loadUserPlaylists();
		//loadSongInfoForPlaylist(default_username, 0);
		loadAllSongInfo();

		// This function call will be overriden on mobile native apps
		// in order to keep file upload hidden, since it's not supported
		navigationHandler.whenDocumentReady();
});
