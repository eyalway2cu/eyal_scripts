<?php
$userip = $_SERVER['REMOTE_ADDR'];
$data = file_get_contents('http://freegeoip.net/json/' . $userip);
$city = json_decode($data)->city);
$state = json_decode($data)->region_name);
if (!isset($city)){
  $city = "In Your Area";
}
?>
