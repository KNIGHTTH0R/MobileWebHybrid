<?php

/*
This script uploads audio files to the directory,
saves the info to music_dir and sends back to client the info for display

Code snippet based on
http://codular.com/javascript-ajax-file-upload-with-progress */

include 'cover.php';
$path = "media/";

// Output JSON
function outputJSON($msg, $status = 'error')
{
    header('Content-Type: application/json');
    die(json_encode(array(
        'data' => $msg,
        'status' => $status
    )));
}

  // Check for errors
  if($_FILES['SelectedFile']['error'] > 0)
  {
      outputJSON('An error ocurred when uploading.');
  }

  // Check filetype
  if($_FILES['SelectedFile']['type'] != 'audio/mp3'){
      outputJSON('Unsupported filetype.');
  }

  // Check filesize
  if($_FILES['SelectedFile']['size'] > 500000000){
      outputJSON('File uploaded exceeds maximum upload size.');
  }

  // Check if the file exists
  if(file_exists($path . $_FILES['SelectedFile']['name'])){
      outputJSON('File with that name already exists.');
  }

  // Upload file
  if(!move_uploaded_file($_FILES['SelectedFile']['tmp_name'], $path . $_FILES['SelectedFile']['name'])){
      outputJSON('Error uploading file - check destination is writeable.');
  }

  // Success!
  //outputJSON('File uploaded successfully', 'success');

  $file = "directory/music_dir.json";
  $json_dir = json_decode(file_get_contents($file), true);
  $dirArray = $json_dir['directory'];

  $fullPath = $_FILES['SelectedFile']['name'];
  $noExtension = substr($_FILES['SelectedFile']['name'], 0, -4);

  $count = count($dirArray); // index of new song
  //$dirArray[$count]['artist'] = $_POST['artist'];
  //$dirArray[$count]['title'] = $_POST['title'];

  $dirArray[$count]['artist'] = getAuthor($noExtension);
  $dirArray[$count]['title'] = getTitle($noExtension);

  $dirArray[$count]['path'] = $noExtension;
  $dirArray[$count]['cover'] = createAndGetImageFromFile($noExtension);

  $newJson = [];
  $newJson['directory'] = $dirArray;

  $newFile = file_put_contents($file, json_encode($newJson,TRUE));

  $dirArray[$count]['id'] = $count;
  $dirArray[$count]['status'] = "success";
  echo json_encode($dirArray[$count],TRUE);

?>
