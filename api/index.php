<?php
include 'function.php';


header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


if(isset($_GET['action'])){
	$action = $_GET['action'];
	
	switch($action){
		case 'scoreboard':
			$pdo = getPdo();
			$sth = $pdo->prepare("SELECT * FROM score ORDER BY score DESC, date DESC");
			$sth->execute();

			$scores = $sth->fetchAll(PDO::FETCH_ASSOC);
			$result = array(
					'status' => array(
						'success' => true,
						'message' => 'Score list'
					),
					'data' => $scores
				);
			break;
		case 'add':
			if(
				isset($_POST['player']) && !empty($_POST['player']) &&
				isset($_POST['score']) && !empty($_POST['score'])
			) {

				$pdo = getPdo();

				$country = null;
				if( isset($_POST['lat']) && !empty($_POST['lat']) &&
					isset($_POST['lng']) && !empty($_POST['lng'])
				){
					$country = getCountry($_POST['lat'], $_POST['lng']);
				}
				
				$statement = $pdo->prepare('INSERT INTO score(score, player, date, country) VALUES(:score, :player, NOW(), :country)');
				$statement->execute(array(
					'score' => $_POST['score'],
					'player' => $_POST['player'],
					'country' => $country
				));
				
				$result = array(
					'status' => array(
						'success' => true,
						'message' => 'Score added...'
					)
				);
			}
			else{
				
				$result = array(
					'status' => array(
						'success' => false,
						'message' => 'Wrong parameters...'
					)
				);
			}
			break;
		default:
			$result = array(
				'status' => array(
					'success' => false,
					'message' => 'Invalid query'
				)
			);
	}
}
else{
	$result = array(
		'status' => array(
			'success' => false,
			'message' => 'Invalid query'
		)
	);
}

echo json_encode($result);