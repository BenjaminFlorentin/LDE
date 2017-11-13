<?php

if(isset($_POST['email']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['msg'])){
	
	// Pour les champs $expediteur / $destinataire, séparer par une virgule s'il y a plusieurs adresses
	$destinataire = 'florentin.ben@gmail.com';
	$expediteur = $_POST['email'];
	$objet = "Prise de contact";

	 // Version MIME
	$headers  = 'MIME-Version: 1.0' . "\n";

	// Copie du mail 
	$headers .= 'Reply-To: '.$expediteur."\n"; 
	
	// Expediteur
	$headers .= 'From:"<'.$_POST['email'].'>'."\n";

	// Destinataire
	$headers .= 'Delivered-to: '.$destinataire."\n";

	// Message
	$message = "Nom : ".$_POST['nom']."\n";
	$message .= "Prénom : ".$_POST['prenom']."\n\n";
	$message .= $_POST['msg'];
	
	// Envoi du message
	if (mail($destinataire, $objet, $message, $headers)){	
		exit(json_encode(array('etat' => 'success')));
	} else {
		// Non envoyé
		exit(json_encode(array('etat' => 'error')));
	}
}  

?>