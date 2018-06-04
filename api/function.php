<?php

function getPdo(){
	$dbhost = "localhost";
	$dbname = "db_thesalt";
	$dbusername = "";
	$dbpassword = "";

	global $pdo;
	
	if(!isset($pdo)){
		$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
	}
	
	return $pdo;
}

function getCountry($lat, $lng){
	$geocode=file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?latlng='.$lat.','.$lng.'&sensor=false');

	$output= json_decode($geocode);

	for($j=0;$j<count($output->results[0]->address_components);$j++){

		$cn=array($output->results[0]->address_components[$j]->types[0]);

		if(in_array("country", $cn)){
			$country= $output->results[0]->address_components[$j]->long_name;
		}
	}

	return $country;
}