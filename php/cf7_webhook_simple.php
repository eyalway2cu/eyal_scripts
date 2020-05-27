<?php
// Create the new wordpress action hook before sending the email from CF7
add_action('wpcf7_before_send_mail', 'sendData');
function sendData($contact_form)
{
    $submission = WPCF7_Submission::get_instance();
    if ($submission) {
        $ch = curl_init("**WEBHOOKURL**");
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($submission->get_posted_data()));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); //Optional timeout value
        curl_setopt($ch, CURLOPT_TIMEOUT, 5); //Optional timeout value
        $result = curl_exec($ch);
        curl_close($ch);
        return;
    }
}
?>
