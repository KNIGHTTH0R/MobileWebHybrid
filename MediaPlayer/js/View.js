var View = (function()
{
		function playButton()
		{
			app.mediaPlayer.play();
		}
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

    function changeSongInfo(song)
    {
			$('.current-song').removeClass("current-song");
			$('#'+song.id).addClass("current-song");
			$('#media-player-song-title').html(song.title);
			$('#media-player-song-artist').html(song.author);
    }

		function createSongList(listOfSongs)
		{
			var documentFragment = document.createDocumentFragment();
			for(var i = 0; i < listOfSongs.length; i++)
			{
					documentFragment.appendChild(createRowForSong(i, listOfSongs[i]));
			}
			$('#song-list').html(documentFragment);
		}

		function createSongRow(index, song)
		{
			// Create a row for song
			var li = document.createElement("li");
			li.id = song.id;
			li.songID = song.id;
			li.textContent = song.title + "/ " + song.author;
			li.onclick = function()
			{
				app.mediaPlayer.playClickedSong(song.id);
			};
			return li;
		}

		function createRowForSong(count, song)
		{
			var li = document.createElement("li");
			li.id = song.id;

			var index = document.createElement("div");
			index.className = "song-row-index";
			index.textContent = count + 1;
			li.appendChild(index);

			var title = document.createElement("div");
			title.className = "song-row-title";
			title.textContent = song.title;
			li.appendChild(title);

			var artist = document.createElement("div");
			artist.className = "song-row-artist";
			artist.textContent = song.author;
			li.appendChild(artist);

			var time = document.createElement("div");
			time.className = "song-row-time";
			time.textContent = "3:00";
			li.appendChild(time);

			// TODO: Set duration of song

			li.onclick = function()
			{
				app.mediaPlayer.playClickedSong(song.id);
				li.className = "current-song";
			};

			return li;
		}

		return {
			init: init,
			showSongList: createSongList,
			changeSongInfo: changeSongInfo
		}

		}()); // Run the unnamed function and assign the results to app for use.
