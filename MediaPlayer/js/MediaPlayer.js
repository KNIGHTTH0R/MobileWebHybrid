var MediaPlayer = (function ()
{
  function Class()
  {
    "use strict";
    var currentSong = 0;
    var songToPlay;
    var currentPlaylist;
    var isPlaying = false;
    var autoPlay = false; // TODO: set true to autoplay on load
    var songStep = 10;

    var _public =
    {
      init: init,
      togglePlay: togglePlay,
      next: next,
      previous: previous,
      backward: backward,
      forward: forward,
      setPlaylist: setPlaylist,
      getPlaylist: getPlaylist,
      playClickedSong: playClickedSong
    };

    function init()
		{
				log("mediaplayer init");
		}

    function getPlaylist()
    {
      return currentPlaylist;
    }

    function setPlaylist(listOfSongs)
    {
      currentPlaylist = listOfSongs;

      if(autoPlay)
        playSong(currentPlaylist.getSongAt(0));
    }

    function togglePlay()
    {
      if(songToPlay != null)
        songToPlay.togglePlay();
    }

    function stop()
    {
      buzz.all().stop();
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

      songToPlay = new buzz.sound ( "media/" + song.path,
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
      songToPlay.bind("playing", songIsPlaying);
      songToPlay.bind("pause", songIsPaused);
    }

    function songIsPlaying()
    {
      isPlaying = true;
      $("#play i").html("&#xE034;");

    }

    function songIsPaused()
    {
      isPlaying = false;
      $("#play i").html("&#xE037;");
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

    function backward()
    {
      if(songToPlay.getTime() - songStep > 0)
      {
        songToPlay.setTime(songToPlay.getTime() - songStep);
      }
    }

    function forward()
    {
      if(songToPlay.getTime() + songStep < songToPlay.getDuration())
      {
        songToPlay.setTime(songToPlay.getTime() + songStep);
      }
    }

    return _public;
  }
  return Class;

})();
