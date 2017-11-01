//----------------------------------------------------------------------------------------------------
// Fichier permettant de définir les actions au survol des éléments d'une page 
//----------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------
// Fonction permettant permettant de gérer les actions au survol des éléments de la page [accueil.html]
//----------------------------------------------------------------------------------------------------

function hoverAcc() {
	// variables
	var drpdwnHover = $("#drpdwnHover"), drpdwnTgt = $('#drpdwnTgt');

	// Gestion du hover du dropdown de la liste des fonctionnalités de la barre de navigation
	drpdwnHover.hover(
		function(){
			// affiche la liste déroulante
			drpdwnTgt.show();
		},
		function(){
			// masque la liste déroulante
			drpdwnTgt.hide();
		}
	);
}


