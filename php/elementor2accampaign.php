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
	$redirect_url = 'thankyoupage';
	
	// add the redirect to ajax handler
	$ajax_handler->add_response_data( 'redirect_url', $redirect_url );


	if( $form_id == 'your_form_id' ){
		$api_key = "12312312";
		$url = "https://clientdomainname.api-us1.com/api/3/contacts" . "?api_key=" . $api_key . "&api_output=json";
		$acdata = array(
			"contact"	=> array(
				"email"	=>	$fields["email"],
				"first_name"	=>	$fields['fname'],
				"last_name"	=>	$fields['lname']
			)
		);
		$opts=array("http"=>array(
			"method"=>"POST",
			"header"=>"api-token: " . $api_key . "\r\nContent-type: application/json",
			"content"=>json_encode($fields)
			));
		$context = stream_context_create($opts);
		$result = file_get_contents($url, false, $context);
		$response = json_decode($result);
		$contact = $response->contact->id;
		echo "<script>localStorage.addItem('acid', " . $contact . ")</script>";
	    // do redirect stuff
		header("Location: ". $redirect_url);
	}else{
	     	return;
	     } 
}

add_action( 'elementor_pro/forms/validation', 'redirectAfterSubmission', 10, 2 );
?>
