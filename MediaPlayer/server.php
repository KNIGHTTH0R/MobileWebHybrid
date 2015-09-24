<?php
// ========================================================================
//
// MAIN Server to process POST requests
//
class Server
{
	// Define a server to handle ajax requests with sepcific actions.
	private $debug = TRUE;

	public function __construct()
	{
		// Constructor is also the incoming request handler
		$this->handle_request();
	}

	public function handle_request() {
		// Look for part of the AJAX params to be an attribute called "action"
		// If it exists, and its set to something other than "" we can do
		// something with this request
		//
        if (isset($_POST["action"]) && !empty($_POST["action"])) {

        	// Get the action requested, save it in an easy to access variable
        	// Your API is defined here, the 'actions' this server responds to and
        	// the parameters each action expects. do some error checking.
        	//
            $action = $_POST["action"];
            switch( $action )
						{
								case "getUserPlaylists":
										$this->getUserPlayLists();
										break;
								case "getSongsForPlaylist";
									$this->getSongsForPlaylist();
										break;
                default:
                    $this->is_error( "Error 101: Invalid Command.");
                    break;
            }
        }
	}

	private function getMedia()
	{
		$mediaFiles = glob("media/*.mp3");
	}

	private function is_error( $error_msg ) {

        // Duplicate the posted parameters
	    $response = $_POST;

	    // Add the error code and message
	    $response['returnCode'] = -1;
	    $response['errorMsg'] = $error_msg;

	    echo json_encode($response);
	}

	private function getUserPlayLists()
	{
		$response = -1;

		if (isset($_POST["username"]))
		{
			$string = file_get_contents("directory/user_dir.json");
			$json = json_decode($string, true);

			$response = $json[$_POST["username"]];
		}
		echo json_encode($response);
	}

	private function getSongsForPlaylist()
	{
		if (isset($_POST["username"]) && isset($_POST["playlist"]))
		{
			$request_user 		= $_POST["username"];
			$request_playlist = $_POST["playlist"];

			$users 		= json_decode(file_get_contents("directory/user_dir.json"), true);
			$songInfo = json_decode(file_get_contents("directory/music_dir.json"), true);

			$playlists = $users[$request_user]['playlists'];
			$playlistSongIds = $playlists[$request_playlist]['songs'];

			$response = [];
			//$response[0] 	= $request_playlist;
			//$response[1] = $playlists[$request_playlist]['name'];

			$count = count($playlistSongIds); // function call once
			for($i = 0; $i < $count; $i++)
			{
				$songID = $playlistSongIds[$i];
				$response[$i]['id']			= $songID;
				$response[$i]['title'] 	= $songInfo['directory'][$songID]['title'];
				$response[$i]['artist'] = $songInfo['directory'][$songID]['artist'];
				$response[$i]['path'] 	= $songInfo['directory'][$songID]['path'];
			}
		}
		else
		{
			$response = -1;
		}

		echo json_encode($response);
	}
}
$server = new Server();
?>
