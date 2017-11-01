//----------------------------------------------------------------------------------------------------
// Fichier appelé au chargement de la page dans le but de définir les fonctions
//----------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------
// Fonction permettant de traduire dans la langue choisie le contenu du site internet
// "id_page" (varchar) nom de la page courante
// "langage" (varchar) langage choisie
//----------------------------------------------------------------------------------------------------

function translate(id_page, langage){
	// si le langage est choisie
	if(langage == null){
		langage = navigator.browserLanguage || navigator.language;
	}

	// on modifie la langue dans la session
	sessionStorage.setItem('langue', langage);

	// on récupère l'indice de ".html"
	var indiceHTML = id_page.indexOf(".html");

	// on récupère la partie avant .html
	var debutIdPage = id_page.substr(0, indiceHTML);

	// on récupère la partie après .html
	var finIdPage = id_page.substr(indiceHTML);

	// on ajoute la langue au nom du fichier
	var newIdPage = debutIdPage + '-' + langage + finIdPage;
	
	// on redirige vers la page actuelle mais dans la langue demandé
	$(location).attr("href", '../' + langage + '/'+ newIdPage);
}