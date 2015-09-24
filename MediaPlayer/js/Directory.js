var directory_log_enabled = true;
var default_username = "username";
var serverPath = "server.php";

function log(data)
{
  if(directory_log_enabled)
    console.log(data);
}

// This class will ask server for the information, and load the files required
function loadUserPlaylists()
{
  // Post a user ID and retrieve a json obj with playlist names
    var request_object =
    {
        'action': 'getUserPlaylists',
        'username': default_username
    };

    var request_param_string = $.param( request_object );
    $.post( serverPath, request_param_string )
        .then(
        function( response_string_json_format )
        {
            var response_object = $.parseJSON( response_string_json_format );           // jQuery version
             //var response_object = JSON.parse( response_string_json_format ); // Native JS version

            var userInfo =  response_object['info']; // do stuff with this
            var playlists = response_object['playlists'];

            var documentFragment = document.createDocumentFragment();
           //foreach playlist the UI will create a row with its title
           for(var i = 0; i < playlists.length; i++)
           {
             var thisPlaylistName = playlists[i]['name'];
             var numOfItems = playlists[i]['songs'].length;
             // Create row for it and add to fragment
             documentFragment.appendChild(createPlaylistRow(i,thisPlaylistName, numOfItems));
           }
           // Add all elements to DOM
           $('#user_playlists').append(documentFragment);
        });
}

function createPlaylistRow(order,playlistName, numOfSongs)
{
  // Create a row of the list of playlists
  var li = document.createElement("li");
  li.id = order;
  li.textContent = playlistName + "/ " + numOfSongs + " songs";
  li.onclick = function()
  {
    loadSongInfoForPlaylist(default_username, order);
  };

  return li;
}

function addUserPlaylist(userID, playlistObj){}

function loadSongInfoForPlaylist(userID, playlistID)
{
  var request_object =
  {
      'action': 'getSongsForPlaylist',
      'username': default_username,
      'playlist' : playlistID
  };

  var request_param_string = $.param( request_object );
  $.post( serverPath, request_param_string )
      .then(
      function( response_string_json_format )
      {
        var response_object = $.parseJSON( response_string_json_format );
        log(response_object);

        var songs_in_playlist = [];
        for(var i = 0; i < response_object.length; i++)
        {
            var songInfo = response_object[i];
            if(songInfo)
            {
              log(songInfo['path']);
              var song = new Song(songInfo['id'],songInfo['title'], songInfo['artist'], songInfo['path']);
              songs_in_playlist[i] = song;
            }
        }
        log(songs_in_playlist);
        View.showSongList(songs_in_playlist);
        var playlist = new Playlist(response_object['playlistID'], response_object['playlistName'], songs_in_playlist);
        app.mediaPlayer.setPlaylist(playlist);
      });
}
