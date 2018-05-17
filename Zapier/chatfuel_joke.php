<?php
// Get messenger user ID from charfuel
$mid = $_GET['messenger_user_id'];

// Prepare data
$url = 'https://icanhazdadjoke.com/';

// Send request to icanhazdadjokes
$opts=array('http'=>array(
	'method'=>'GET',
	'header'=>'Accept: application/json',
	'ignore_errors' => true
	));
$context = stream_context_create($opts);
$result = file_get_contents($url, false, $context);
$response = json_decode($result);

// save joke to $joke
$joke = $response->joke;

// Chatfuel data 
$postcontent = array(
			'chatfuel_token'	=>	'[your chatfuel token]',
			'chatfuel_block_id'	=>	'[your chatfuel block id]',
			'joke'	=> $joke
	    );
$chatfuelurl = "https://api.chatfuel.com/bots/[botid]/users/" . $mid . "/send?" . http_build_query($postcontent);

$optscf = array('http'=>array(
	'method'=>'POST',
	'header'=>'Content-Type: application/json',
	'ignore_errors' => true
	));
$context = stream_context_create($optscf);
$result = file_get_contents($chatfuelurl, false, $context, 0, 1000);
//error_log($result);
?>
