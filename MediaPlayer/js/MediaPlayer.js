var MediaPlayer = (function ()
{
  function Class()
  {
    "use strict";
    var currentSong = 0;
    var currentPlaylist;

    var _public =
    {
      init: init,
      play: play,
      next: next,
      setPlaylist: setPlaylist,
      playClickedSong: playClickedSong
    };

    var _private =
    {
      requestSong: requestSong
    };

    function init()
		{
				log("mediaplayer init");
		}

    function setPlaylist(listOfSongs)
    {
      currentPlaylist = listOfSongs;
    }

    function play()
    {
      currentSong.play;
    }

    function playClickedSong(id)
    {
      for(var i in buzz.sounds)
      {
        buzz.sounds[i].pause();
      }

      var songToPlay = new buzz.sound ( "media/"+currentPlaylist.songArray[id].path,
      {
        formats: ["mp3"],
        preload:true,
        autoplay:true,
        loop:false,
        volume: 10
      });
    }

    function updateView()
    {

    }

    function next()
    {
      //currentSong.pause;
      if(this.currentSong + 1 < currentSong.numOfSongs)
      {
        this.currentSong++; // TODO: if at end of list, go to 0
      }
      else
      {
        this.currentSong = 0;
      }
      // currentSong.play;
      // do stuff in UI
    }

    function requestSong(songID)
    {
        // Ask for this song from the server
    }

    return _public;
  }
  return Class;

})();
