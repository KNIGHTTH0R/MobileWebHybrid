/*
 * App Singleton MAIN
 *
 * @copyright: (C) 2014 Kibble Games Inc in cooperation with Vancouver Film School. All Rights Reserved.
 * @author: Scott Henshaw {@link mailto:shenshaw@vfs.com}
 * @version: 1.1.0
 *
 * @summary: Framework Singleton Class to contain a web app
 *
 */
var App = (function() {

	function Class()
	{
			"use strict";

			var mediaPlayer = new MediaPlayer();
			var currentUser;
	    var _private =
			{
	        // the local object contains all the private members used in this class
            done: false
	    }

      var _public =
			{
	        // the API object contains all the public members and methods we wish to expose
	        // the Class function shuld return this.
            run: run,
            init: init,
						mediaPlayer: mediaPlayer
	    };

      function init()
			{
				View.init();
				mediaPlayer = new MediaPlayer();
				mediaPlayer.init();
    	}

    	function run()
			{
    		while (!_private.done)
				{
    			updateData();
    			refreshView();
    		}
    	};

      function updateData()
			{
          // Update the app/simulation model
        	// is the app finished running?
        	_private.done = true;
      }

      function refreshView()
			{
          // Refresh the view - canvas and dom elements

      }

			return _public;
    }

	return Class;

})();  // Run the unnamed function and assign the results to app for use.


// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return
// them
var app;
$(document).ready( function()
{
		app = new App();
    app.init();
    app.run();
		//loadUserPlaylists();
		loadSongInfoForPlaylist(default_username, 0);
});
