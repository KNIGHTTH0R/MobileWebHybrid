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
		// Is this an AJAX request (params and json data?) if not, bye-bye.
		if (!$this->is_ajax())
		{
			return;
		}
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
								// next_song
								// prev_song
								// resume_song
								// pause_song
								// get_song_list
                case "test":
                    $this->do_test();
                    break;

                default:
                    $this->is_error( "Error 101: Invalid Command.");
                    break;
            }
        }

	}


	private function is_ajax() {
		// Function to check if the request is an AJAX request
		//
	  //  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
		return true;
	}

	private function getMedia()
	{
		$mediaFiles = glob("music/*.mp3");
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
			$string = file_get_contents("../Server/user_dir.json");
			$json = json_decode($string, true);

			$response = $json[$_POST["username"]];

/*Test Code
			// Duplicate the posted parameters
		$response = $_POST;

		// Add the error code and message
		$response['poop'] = -1;
		$response['wohoo'] = "bla";
		echo json_encode($response);*/
		}
		echo json_encode($response);
	}

	private function getSongsForPlaylist()
	{
		if (isset($_POST["username"]) && isset($_POST["playlist"]))
		{
			$request_user 		= $_POST["username"];
			$request_playlist = $_POST["playlist"];

			$users 		= json_decode(file_get_contents("../Server/user_dir.json"), true);
			$songInfo = json_decode(file_get_contents("../Server/music_dir.json"), true);

			$playlists = $users[$request_user]['playlists'];
			$playlistSongIds = $playlists[$request_playlist]['songs'];

			$response = [];

			$count = count($playlistSongIds); // function call once
			for($i = 0; $i < $count; $i++)
			{
				$songID = $playlistSongIds[$i];
				$response[$i]['id']			= $songID;
				$response[$i]['title'] 	= $songInfo['directory'][$songID]['title'];
				$response[$i]['artist'] = $songInfo['directory'][$songID]['artist'];
			}
		}
		else
		{
			$response = -1;
		}

		echo json_encode($response);
	}

	private function do_test()
	{
		// Here is the actual worker function, this is where you do your server sode processing and
		// then generate a json data packet to return.
		$request = $_POST;

		// Here is what we will send back (echo) to the person that called us.
		// fill this dictionary with attribute => value pairs, then
		// encode as a JSON string, then
		// echo back to caller
		$response = [];

		// As we are debugging, mirror the entire original request so we can be sure
		// that we are getting back what we asked for.
		// Turn this off when we release
		//
		if ($debug) {
			$response = $request;
		}

	    // Do what you need to do with the info. The following are some examples.
	    // This is the real set of actual things we use
	    $response["favorite_beverage"] = $request["favorite_beverage"];
	    if ($request["favorite_beverage"] == ""){
	         $response["favorite_beverage"] = "Coke";
	    }
	    $response["favorite_restaurant"] = "McDonald's";

	    // Another debug aid.
	    // Take the entire response, encode as a single JSON string, then
	    // add that string to an attribute of the response.
	    // This enables us to look at the actual JSON being sent to us as JSON, before
	    // its turned into something else.
	    //
	    // It also doubles the size of the return data
	    //
	    if ($debug) {
	    	$response["json"] = json_encode($response);
	    }

	    // echo the response JSON back to stdout where the reciever can access and work with it.
	    echo json_encode($response);
	}
}


// now that we have defined the server, create one and only one.
// The constructor will run and immediately handle the request that started this server,
// send a response and exit where it all gets destroyed...
$server = new Server();
?>
