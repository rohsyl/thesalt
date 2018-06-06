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

function getPlayerBestScore($playerName){
	$pdo = getPdo();
	$sth = $pdo->prepare("SELECT MAX(score) FROM score WHERE player LIKE :player");
	$sth->execute(array(
		'player' => $playerName
	));

	$score = $sth->fetchColumn(0);
	
	return isset($score) ? $score : 0;
}

function deletePlayerScore($playerName){
	$pdo = getPdo();
	$sth = $pdo->prepare("DELETE FROM score WHERE player LIKE :player");
	$sth->execute(array(
		'player' => $playerName
	));
}

function insertScore($score, $player, $country){
	$pdo = getPdo();
	$statement = $pdo->prepare('INSERT INTO score(score, player, date, country) VALUES(:score, :player, NOW(), :country)');
	$statement->execute(array(
		'score' => $score,
		'player' => $player,
		'country' => $country
	));
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