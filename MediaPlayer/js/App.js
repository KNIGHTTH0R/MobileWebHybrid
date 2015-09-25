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

var app;
$(document).ready( function()
{
		app = new App();
    app.init();
		//loadUserPlaylists();
		//loadSongInfoForPlaylist(default_username, 0);
		loadAllSongInfo();
});
