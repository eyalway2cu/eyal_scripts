 <?php
// Create the new wordpress action hook before sending the email from CF7
add_action('wpcf7_before_send_mail', 'sendData');
function sendData($contact_form)
{
    $submission = WPCF7_Submission::get_instance();

    // Get the post data and other post meta values
    if ($submission) {
        $posted_data = $submission->get_posted_data();
        $url         = $submission->get_meta('url');
        $id          = $posted_data{["formid"]};

        // Encode the data in a new array in JSON format
        $data = json_encode(array(
            "email" => "{$posted_data["your-email"]}",
            "name"  => "{$posted_data["your-name"]}",
            "phone" => "{$posted_data["your-phone"]}",
            "sid"   => "{$posted_data["sid"]}",
            "URL"   => "$url",
        ));

        // Finally send the data to webhook endpoint
        $ch = curl_init("**WEBHOOKURL**");
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
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
