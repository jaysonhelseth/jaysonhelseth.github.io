<?php
	if (strpos($_SERVER['HTTP_REFERER'], 'bam') > -1 ) {
		echo "No access.";
		die;
	}
	header("Access-Control-Allow-Origin: *");

	$obj->temp = 76;
	$obj->humidity = 80;
	$obj->refer = $_SERVER['HTTP_REFERER'];

	$json = json_encode($obj);
	echo $json;
?>
