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
      previous: previous,
      setPlaylist: setPlaylist,
      playClickedSong: playClickedSong
    };

    var _private =
    {

    };

    function init()
		{
				log("mediaplayer init");
		}

    function setPlaylist(listOfSongs)
    {
      currentPlaylist = listOfSongs;
      // TODO: uncomment this to autoplay on load
      // playSong(currentPlaylist.getSongAt(0));
    }

    function play()
    {
      currentSong.play;
    }

    function stop()
    {
      for(var i in buzz.sounds)
      {
        buzz.sounds[i].stop();
      }
    }

    function playClickedSong(id)
    {
      playSong(currentPlaylist.getSongAt(id));
    }

    function playSong(song)
    {
      stop();

      currentSong = song.id;
      View.changeSongInfo(song);

      var songToPlay = new buzz.sound ( "media/" + song.path,
      {
        formats: ["mp3"],
        preload:true,
        autoplay:true,
        loop:false,
        volume: 10
      });

      songToPlay.load().play().fadeIn(500);
      songToPlay.bind("ended", next);
      songToPlay.bind("timeupdate", bindSoundToTimeBar);
    }

    function bindSoundToTimeBar()
    {
      $("#media-player-time-total").html("/"+buzz.toTimer(this.getDuration()));
      $("#media-player-time-elapsed").html(buzz.toTimer(this.getTime()));
      $("#time-bar").attr({ max: this.getDuration() });
      $("#time-bar").val(this.getTime());
    }

    function previous()
    {
      if(currentSong - 1 >= 0)
      {
        currentSong--;
      }
      else
      {
        currentSong = currentPlaylist.numberOfSongs() - 1;
      }
      playSong(currentPlaylist.getSongAt(currentSong));
    }

    function next()
    {
      if(currentSong + 1 < currentPlaylist.numberOfSongs())
      {
        currentSong++;
      }
      else
      {
        currentSong = 0;
      }
      playSong(currentPlaylist.getSongAt(currentSong));
    }

    return _public;
  }
  return Class;

})();
