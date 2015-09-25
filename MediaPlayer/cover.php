<?php

/*ZEND DOCS https://code.google.com/p/php-reader/wiki/ID3v2 */

require_once 'Zend/Media/Id3v2.php'; // or using autoload
require_once 'Zend/Media/Id3/Exception.php';

function createImagesForAllFiles($directory)
{/*
  // Retrieve all files in the directory
  foreach (glob($directory . "/*.mp3") as $file)
  {
    echo "Reading " . $file . "\n";

    //Attempt to parse the file, catching any exceptions
    try {
      $id3 = new Zend_Media_Id3v2($file);
    }
    catch (Zend_Media_Id3_Exception $e) {
      echo "  " . $e->getMessage() . "\n";
      continue;
    }

    if(isset($id3->talb))
    {
      //$title = $id3->tit2->text;
      $album = $id3->talb->text;
      $path = "media/covers/" . $album;
      echo $path;
    }

    if (isset($id3->apic))
    {
      echo "  Found a cover image, writing image data to a separate file..\n";
      //Write the image
      $type = explode("/", $id3->apic->mimeType, 2);
      if (($handle = fopen($image = $path . "." . $type[1], "wb")) !== false)
      {
        if (fwrite($handle, $id3->apic->imageData, $id3->apic->imageSize) != $id3->apic->imageSize)
          echo "  Found a cover image, but unable to write image file: " .
            $image . "\n";
        fclose($handle);
      }
      else echo "  Found a cover image, but unable to open image file " .
        "for writing: " . $image . "\n";
    }
    else
      echo "  No cover image found!\n";
  }*/
}

function createAndGetImageFromFile($songPath)
{
  if(endsWith($songPath, ".mp3") === FALSE)
    $file = "media/" . $songPath . ".mp3";
  else
    $file = "media/" . $songPath;

  //echo "Reading " . $file . "\n";

  // Attempt to parse the file, catching any exceptions
  try
  {
    $id3 = new Zend_Media_Id3v2($file);
  }
  catch (Zend_Media_Id3_Exception $e)
  {
    __debugEcho($e->getMessage());
    continue;
  }

  $album = "";

  if(isset($id3->talb))
  {
    //$title = $id3->tit2->text;
    //$author = $id3->tpe1->text;
    $album = $id3->talb->text;
    $path = "media/covers/" . $album;
  }

  if(isset ($id3->tlen))
  {
    echo $id3->tlen->text;
  }

  if (isset($id3->apic))
  {
    __debugEcho("Found a cover image, writing image data to a separate file..");
    // Write the image
    $type = explode("/", $id3->apic->mimeType, 2);
    if (($handle = fopen($image = $path . "." . $type[1], "wb")) !== false)
    {
      if (fwrite($handle, $id3->apic->imageData, $id3->apic->imageSize) != $id3->apic->imageSize)
        __debugEcho ("  Found a cover image, but unable to write image file: " .
          $image);
      fclose($handle);
    }
    else __debugEcho(" Found a cover image, but unable to open image file " .
      "for writing: " . $image);
  }
  else
    __debugEcho("No cover image found!");

  return $album;
}

function endsWith($string, $substring) {
    // search forward starting from end minus needle length characters
    return $substring === "" || (($temp = strlen($string) - strlen($substring)) >= 0 && strpos($string, $substring, $temp) !== FALSE);
}

function getTitle($songPath)
{
    if(endsWith($songPath, ".mp3") === FALSE)
      $file = "media/" . $songPath . ".mp3";
    else
      $file = "media/" . $songPath;

    try
    {
      $id3 = new Zend_Media_Id3v2($file);
    }
    catch (Zend_Media_Id3_Exception $e)
    {
      __debugEcho($e->getMessage());
      continue;
    }

    $title = "";

    if(isset($id3->tit2))
    {
      $title = $id3->tit2->text;
    }

    return $title;
}

function getAuthor($songPath)
{
    if(endsWith($songPath, ".mp3") === FALSE)
      $file = "media/" . $songPath . ".mp3";
    else
      $file = "media/" . $songPath;

    try
    {
      $id3 = new Zend_Media_Id3v2($file);
    }
    catch (Zend_Media_Id3_Exception $e)
    {
      __debugEcho($e->getMessage());
      continue;
    }

    $author = "";

    if(isset($id3->tpe1))
    {
      $author = $id3->tpe1->text;
    }

    return $author;
}


function __debugEcho($string)
{
  $echo = FALSE;
  if($echo === TRUE)
    echo json_encode($string);
}

?>
