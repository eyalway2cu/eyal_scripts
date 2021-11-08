<?php
class Powerlink{
	public $objecttype;
	public $objectid;
	public $query;
	public $payload;
	public $token;

	function query($objecttype, $query, $token){
		$querycontent = array(
			"objecttype"	=>	$objecttype,
			"page_size"	=>	500,
			"page_number"	=>	1,
			"fields"	=>	"*",
			"query"	=>	"(" . $query . ")",
			"sort_type"	=>	"desc"
			);
		if (strstr($query, "(")){
			$querycontent["query"] = $query;
		}
		$url = "https://api.powerlink.co.il/api/query";
		$opts=array("http"=>array(
			"method"=>"POST",
			"header"=>"tokenid: ". $token . "\r\nContent-type: application/json",
			"content"=>json_encode($querycontent)
			));
		$context = stream_context_create($opts);
		$result = file_get_contents($url, false, $context);
		return json_decode($result);
	}

	function queryLimit($objecttype, $query, $token){
		$querycontent = array(
			"objecttype"	=>	$objecttype,
			"page_size"	=>	500,
			"page_number"	=>	1,
			"fields"	=>	"*",
			"query"	=>	"(" . $query . ")",
			"sort_type"	=>	"desc"
			);
		if (strstr($query, "(")){
			$querycontent["query"] = $query;
		}
		$url = "https://api.powerlink.co.il/api/query";
		$opts=array("http"=>array(
			"method"=>"POST",
			"header"=>"tokenid: ". $token . "\r\nContent-type: application/json",
			"content"=>json_encode($querycontent)
			));
		$context = stream_context_create($opts);
		$result = file_get_contents($url, false, $context);
		return json_decode($result);
	}

	function create($objecttype, $payload, $token){
		$url = "https://api.powerlink.co.il/api/record/" . $objecttype;
		$opts=array("http"=>array(
			"method"=>"POST",
			"header"=>"tokenid: ". $token . "\r\nContent-type: application/json\r\nContent-length: " . strlen(json_encode($payload)),
			"content"=>json_encode($payload)
			));
		$context = stream_context_create($opts);
		$result = file_get_contents($url, false, $context);
		return json_decode($result);
	}

	function addComment($payload, $token){
		$url = "https://api.powerlink.co.il/api/record/7";
		$opts=array("http"=>array(
			"method"=>"POST",
			"header"=>"tokenid: ". $token . "\r\nContent-type: application/json\r\nContent-length: " . strlen(json_encode($payload)),
			"content"=>json_encode($payload)
			));
		$context = stream_context_create($opts);
		$result = file_get_contents($url, false, $context);
		return json_decode($result);
	}

	function order($payload, $token){
		$url = "https://api.powerlink.co.il/api/record/crmorder";
		$opts=array("http"=>array(
			"method"=>"POST",
			"header"=>"tokenid: ". $token . "\r\nContent-type: application/json",
			"content"=>json_encode($payload)
			));
		$context = stream_context_create($opts);
		$result = file_get_contents($url, false, $context);
		return json_decode($result);
	}

	function update($objecttype, $objectid, $payload, $token){
		$url = "https://api.powerlink.co.il/api/record/". $objecttype. "/" . $objectid;
		$opts=array("http"=>array(
			"method"=>"PUT",
			"header"=>"tokenid: ". $token . "\r\nContent-type: application/json",
			"content"=>json_encode($payload)
			));
		$context = stream_context_create($opts);
		$result = file_get_contents($url, false, $context);
		//error_log($url);
		//error_log(var_export($payload, true));
		return json_decode($result);
	}

	function delete($objecttype, $objectid, $token){
		$url = "https://api.powerlink.co.il/api/record/" . $objecttype . "/" . $objectid;
		$opts=array("http"=>array(
			"method"=>"Delete",
			"header"=>"tokenid: ". $token . "\r\nContent-type: application/json",
			));
		$context = stream_context_create($opts);
		$result = file_get_contents($url, false, $context);
		return json_decode($result);
	}
}
?>
