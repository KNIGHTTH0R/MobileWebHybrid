function User(username, playlists)
{
    this.username   = username;
    this.playlists  = playlists;
}

function Playlist(id, playlistName, songIDsArray)
{
    this.id         = id;
    this.name       = playlistName;
    this.songArray  = songIDsArray; // array of ints
}

Playlist.prototype =
{
    getSongAt: function( index )
    {
        return this.songArray[index];
  	},

    numberOfSongs: function()
    {
      return this.songArray.length;
    }
}

function Song(id, title, author, path)
{
    this.id     = id;
    this.title  = title;
    this.author = author;
    this.path   = path;
}
