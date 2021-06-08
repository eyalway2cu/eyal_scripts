<?php
/* 
This code will send a webhook to your desired URL after a succesfull Elementor form submission.
It will not interfere with any webhooks that are set on the form.
*/
/* copy from here */
function sendSecondWebhookElementor( $record, $ajax_handler ){
    // get form settings
    $form_settings = $record->get('form_settings');
    // get form ID
    $form_id = $form_settings['form_id'];

    // get fields using method in Form_Record class
    $raw_fields = $record->get('fields');
        $fields = [];
    foreach ( $raw_fields as $id => $field ) {
            $fields[$id] = $field['value'];
    }

    $url = "WEBHOOKURL";
    $opts=array("http"=>array(
        "method"=>"POST",
        "header"=>"Content-type: application/json",
        "content"=>json_encode($fields)
        ));
    $context = stream_context_create($opts);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result);
    return $response;
}

add_action( 'elementor_pro/forms/validation', 'sendSecondWebhookElementor', 10, 2 );
/* copy until here */
?>
