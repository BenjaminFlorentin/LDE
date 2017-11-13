//----------------------------------------------------------------------------------------------------
// Fichier appelé au chargement de la page dans le but d'exécuter certaines tâches, fonctions, etc....
//----------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------
// Variables utilisées pour plusieurs fonctions
//----------------------------------------------------------------------------------------------------

// objet JS contenant le nom des fonctions à exécuter de chaque page en fonction de leur nom. Structure : 
//	- [nom_page]
//		- initialisation de la page
//		- gestion du clic des éléments de la page
//		- gestion du survol des éléments de la page
pgs = {
	"accueil.html" : {
		'init' : initAcc,
		'eClick' : clickAcc,
		'eHover' : hoverAcc
	},
	"contact.html" : {
		'init' : initCtc,
		'eClick' : clickCtc,
		'eHover' : hoverCtc
	}
};

//----------------------------------------------------------------------------------------------------
// Fonction permettant d'initialiser une page
//
// [id] : nom de la page
//----------------------------------------------------------------------------------------------------

function init(id) {
	// on paramètre le langage
	setLangue();

	//-------------------------------------------------------
	// on récupère le nom des fonctions à exécuter :
	//  - [fct] : initialisation de la page
	// 	- [clk] : gestion du clic sur les éléments de la page
	// 	- [hov] : gestion du survol sur les éléments de la page
	//-------------------------------------------------------
	var fct = pgs[id].init, clk = pgs[id].eClick, hov = pgs[id].eHover;

	// exécution des fonctions
	fct();
	clk();
	hov();

	// gestion du click sur les boutons de traduction
	changeTranslate(id);

	// initialisation des fonctions d'évènement [click, hover]
	clickLayHome();
}


//----------------------------------------------------------------------------------------------------
// Fonction permettant d'initialiser la page [accueil.html]
//----------------------------------------------------------------------------------------------------

function initAcc() {
}

//----------------------------------------------------------------------------------------------------
// Fonction permettant d'initialiser la page [contact.html]
//----------------------------------------------------------------------------------------------------

function initCtc() {
}

//----------------------------------------------------------------------------------------------------
// Fonction permettant de déterminer la langue
//----------------------------------------------------------------------------------------------------
function setLangue(){
	// Si la langue est déjà définie
	if(typeof sessionStorage.langue == "undefined"){

		// on récupère la langue du navigateur
		var language = navigator.browserLanguage || navigator.language;

		if(language.indexOf('fr') >= -1){
			sessionStorage.setItem('langue', "fr");
		}else{
			sessionStorage.setItem('langue', "en");
		} 
	} else {
		// on va ajouter la classe 'drapeau-actif' sur la langue choisie
		$("#" + sessionStorage.langue).parent().addClass('drapeau-actif');
	}
}