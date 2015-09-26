<?php

/*
This script gets data from directory json files,
processes, organizes and sends the requested data back to the client
*/
class Server
{
	private $debug = TRUE;

	public function __construct()
	{
		// Constructor is also the incoming request handler
		$this->handle_request();
	}

	public function handle_request()
	{
        if (isset($_POST["action"]) && !empty($_POST["action"]))
				{

            $action = $_POST["action"];
            switch( $action )
						{
								case "getUserPlaylists":
										$this->getUserPlayLists();
										break;
								case "getSongsForPlaylist";
									$this->getSongsForPlaylist();
										break;
								case "getAllSongs":
									$this->getAllSongs();
									break;
								case "uploadFile":
									$this->uploadFile();
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

	private function is_error( $error_msg )
	{
	    $response = $_POST;
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
				$response[$i]['cover'] 	= $songInfo['directory'][$songID]['cover'];
			}
		}
		else
		{
			$response = -1;
		}

		echo json_encode($response);
	}

	private function getAllSongs()
	{
		$songDir = json_decode(file_get_contents("directory/music_dir.json"), true);
		$songInfo = $songDir['directory'];
		$response = [];
		$count = count($songInfo); // function call once

		for($i = 0; $i < $count; $i++)
		{
			$response[$i]['id']			= $i;
			$response[$i]['title'] 	= $songInfo[$i]['title'];
			$response[$i]['artist'] = $songInfo[$i]['artist'];
			$response[$i]['path'] 	= $songInfo[$i]['path'];
			$response[$i]['cover'] 	= $songInfo[$i]['cover'];
		}
		echo json_encode($response);
	}

	private function uploadFile()
	{
		//move upload requests to this server.php
	}

}
$server = new Server();
?>
