<?php
/* 
This code will redirect to your desired URl after a succesfull Elementor form submission.
It will not interfere with any webhooks that are set on the form.
*/
function redirectAfterSubmission( $record, $ajax_handler ){
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

	// set up my redirect url
	$redirect_url = 'https://yoururl.com?name=' . $fields['name'] . '&email=' . $fields['email'];
	
	// add the redirect to ajax handler
	$ajax_handler->add_response_data( 'redirect_url', $redirect_url );


	if( $form_id == 'your_form_id' ){
	    // do redirect stuff
		header("Location: ". $redirect_url);
	}
	    else{
	         return;
	    }
}

add_action( 'elementor_pro/forms/validation', 'redirectAfterSubmission', 10, 2 );
?>
