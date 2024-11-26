<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$formid = "{{formid}}";
$cbtoken = "{{cbtoken}}";

function qstoJson(){
	for($i=0;$i<sizeof($_REQUEST);$i++)
	{
		$_REQUEST[$_REQUEST[$i]] = $_REQUEST[++$i];
	}
	$data =(object)$_REQUEST;
	return $data;
}

include('../callbox/framework.php');
$data = qstoJson();

$payload = array(
    "formid"	=>	$formid,
    "country_code" => "972",
    "phone_number"	=> $data->phoneNumber,
    "visitor_sid"	=>	$data->sid
);

$formlead = new Callbox();
$result = $formlead->form($formid, $payload, $cbtoken);
?>
