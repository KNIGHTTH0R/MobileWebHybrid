var mediaPlayer =
{
  var currentSong = 0;

  function play()
  {
    // currentSong.play;
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
}
