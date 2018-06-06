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
				$player = $_POST['player'];
				$score = $_POST['score'];
				
				// get player best score
				$bestScore = getPlayerBestScore($player);
				
				// if this score is bigger
				if($score > $bestScore){
					// delete all old score
					deletePlayerScore($player);
				
					// insert new score
					$country = null;
					if( isset($_POST['lat']) && !empty($_POST['lat']) &&
						isset($_POST['lng']) && !empty($_POST['lng'])
					){
						$country = getCountry($_POST['lat'], $_POST['lng']);
					}
					
					insertScore($score, $player, $country);
					
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
							'success' => true,
							'message' => 'Score not added because is not ' . $player .' best score...'
						)
					);
				}
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