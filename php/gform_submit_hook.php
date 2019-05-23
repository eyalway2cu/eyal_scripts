<?php
add_action( "gform_after_submission_1", "post_to_third_party", 10, 2 );
function post_to_third_party( $entry, $form ) {
    
    $moving_from_array = explode(',', rgar($entry, "5.1"));
    $moving_from_country = array_pop($moving_from_array);     
    $moving_from_city = implode(",", $moving_from_array);

    $moving_to_array = explode(',', rgar($entry, "18.1"));
    $moving_to_country = array_pop($moving_to_array);     
    $moving_to_city = implode(",", $moving_to_array);

    $post_url = "XXX";

    $body = json_encode(array(
        "moving_from_city" => $moving_from_city,
        "moving_from_country" => $moving_from_country,
        "moving_to_city" => $moving_to_city,
        "moving_to_country" => $moving_to_country,
        "move_date" => rgar($entry, "7"),
        "full_name" => rgar($entry, "19"),
        "email" => rgar($entry, "16"),
        "phone" => rgar($entry, "11"),
        "additional_information" => rgar($entry,"20")
        ));
    $body = json_decode($body);
    $request = new WP_Http();
    $response = $request->post( $post_url, array( 
        "method"    =>  "POST",
        "header"    =>  "Content-Type: application/json",
        "body" => $body 
        ) 
    );
}
?>
