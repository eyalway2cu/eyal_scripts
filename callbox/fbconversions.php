<?php
$data = json_decode(file_get_contents("php://input"));

include '../facebook/framework.php';
include '../callbox/framework.php';

$pixel_id   = "";
$token      = "";
$event_name = "CallboxCall";
$event_time = $data->unix_time;
$user_data  = array(
    "ph"          => hash('sha256', '0' . $data->caller_number_bare),
    "fbc"         => $data->custom_fields->fcb
);
$custom_data = array();

$facebook = new Facebook();
$conversionSent = $facebook->conversion($pixel_id, $token, $event_name, $event_time, $user_data, $custom_data);
if (!property_exists($conversionSent, "error")) {
    $fbtrace_id = $conversionSent->fbtrace_id;
} else {
    $fbtrace_id = "error";
}
echo json_encode($conversionSent);

$callbox = new Callbox();
$cbtoken = "";
$payload = array(
    "call_id"       => $data->id,
    "account_id"    => $data->account_id,
    "custom_fields" => array(
        "fbtrace_id" => $fbtrace_id
    )
);
$modify = $callbox->modifyCall($data->id, $data->account_id, $payload, $cbtoken);
// error_log(var_export($modify, true));
?>
