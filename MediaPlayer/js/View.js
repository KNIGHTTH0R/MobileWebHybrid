
/* Handles most of the DOM
Creates html elements, assigns click events...*/

var View = (function()
{
		var coversPath =  "media/covers/";
		var imagesPath =  "images/";

		function playButton()
		{
			app.mediaPlayer.play();
		}
		function init()
		{
				//TODO: implement splash screen?
				assignClickFunctions();
		}

		function assignClickFunctions()
		{
			// UPLOAD
			$('#file-choose-button').click(function(){$('#file').click();});
			$('#submit').click(function(){uploadSong();});

			// MEDIA PLAYER
			$('#previous').click(function(){app.mediaPlayer.previous();});
			$('#rewind').click(function(){app.mediaPlayer.backward();});
			$('#play').click(function(){app.mediaPlayer.togglePlay();});
			$('#forward').click(function(){app.mediaPlayer.forward();});
			$('#next').click(function(){app.mediaPlayer.next();});
			$('.close').click(function()
			{
				$('#popup').addClass('hide');
			});
		}

    function changeSongInfo(song)
    {
			$('.current-song').removeClass("current-song");
			$('#'+song.id).addClass("current-song");
			$('#media-player-song-title').html(song.title);
			$('#media-player-song-artist').html(song.author);

			// if there is no cover image use default
			if(imageExists(coversPath + song.cover + ".jpeg"))
				$('#media-player-album-cover-img').attr("src", coversPath + song.cover + ".jpeg");
			else
				$('#media-player-album-cover-img').attr("src", imagesPath + "cover.png");
    }

		function imageExists(url)
		{
		   var img = new Image();
		   img.src = url;
		   return img.height != 0;
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

		function appendRow(song)
		{
			var documentFragment = document.createDocumentFragment();
			documentFragment.appendChild(createRowForSong(song.id, song));
			$('#song-list').append(documentFragment);
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

		function showPopup(title, description)
		{
			$('.popup h4').html(title);
			$('.pop-content').html(description);
			$('#popup').removeClass('hide');
		}

		return {
			init: init,
			showSongList: createSongList,
			changeSongInfo: changeSongInfo,
			appendRow: appendRow,
			showPopup: showPopup
		}

		}());
