<?php

header('Content-Type: application/json'); // envoi des réponses Json

require_once 'vendor/autoload.php'; // cherge les classes PHP

$clientId = '33677304791-eun8ku65lkpej605n6qac9ilbadhkji4.apps.googleusercontent.com';

$idToken = isset($_POST['id_token']) ? (string) $_POST['id_token'] : null; // récupère l'id token de la requete HTTP dans Postman

if(!$idToken){
  http_response_code(406); // erreur client (400) requête pas acceptable
  echo json_encode([
    'error' => "Le token n'existe pas !",
  ]);
  die;
}

$client = new Google_Client([
  'client_id' => $clientId
]);

try { // verifie si le token existe
  $payload = $client->verifyIdToken($idToken);

} catch (Exception $e) { // si ça ne marche pas Google envoie une exception
  http_response_code(401);
  echo json_encode([
    'error' => "Token invalide !",
  ]);
  die;
}

$userId = $payload['sub']; // sub = id chez google 

echo json_encode($payload);

 ?>
