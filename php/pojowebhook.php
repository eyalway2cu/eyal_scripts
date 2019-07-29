<?php
add_action( 'pojo_forms_mail_sent', function( $form_id, $field_values ) {
	// POSTed
	$fields = wp_list_pluck( $field_values, 'value', 'title' );
	
	// Webhook URL
	$webhook = 'http://YOUR_WEBHOOK_URL';
	
	// API Request
	$response = wp_remote_post( $webhook, [
		'method' 	=> 'POST',
		'body' 		=> $fields
	] );
	
	// Error handling
	//if ( is_wp_error( $response ) ) {
		// Enable Debug logging to the /wp-content/debug.log file
		//if ( defined( 'WP_DEBUG_LOG' ) && WP_DEBUG_LOG ) {
			//error_log( $response->get_error_message() );
		//}
	//}
	
	// Return
	return;
}, 10, 2 );
