var View = (function()
{

		function init()
		{
				log("view init");
		}
    function showUserPlaylists()
		{

  	}

  	function showPlaylist()
		{

  	}

    function updateSongProgress(percentage)
    {

    }

    function changeSongInfo(title, artist)
    {

    }

		function createSongList(listOfSongs)
		{
			var documentFragment = document.createDocumentFragment();
			for(var i = 0; i < listOfSongs.length; i++)
			{
					documentFragment.appendChild(createSongRow(listOfSongs[i]));
			}
			$('#user_playlists').html(documentFragment);
		}

		function createSongRow(song)
		{
			// Create a row for song
			var li = document.createElement("li");
			li.id = song.id;
			li.songID = song.id;
			li.textContent = song.title + "/ " + song.author;
			li.onclick = function()
			{
				loadSong(song.id, song.title);
			};
			return li;
		}

		return {
			init: init,
			showSongList: createSongList
		}

		}()); // Run the unnamed function and assign the results to app for use.
