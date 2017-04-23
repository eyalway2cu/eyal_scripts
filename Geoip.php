<?php
$userip = $_SERVER['REMOTE_ADDR'];
$data = file_get_contents('http://freegeoip.net/json/' . $userip);
$city = json_decode($data)->city);
$state = json_decode($data)->region_name);
?>
