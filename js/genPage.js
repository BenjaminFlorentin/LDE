// variables
var fs = require("fs"), cheerio = require('cheerio'), pageTraduite = "",
$ = require('jquery'), i = 0, lLang = 0, j = 0, lPgs = 0, buf = "", langueSelected = "", pageSelected = "",
data = "", readStream = "", filePtr = {}, fileBuffer = {}, buffer = new Buffer(4096),

// variable contenant les langues dans lequelles seront traduient la pages html
langue = [ "fr", "en"],

// variable contenant le nom des pages à traduire
pages = [ "accueil"],

// variables contenant l'id des inputs
lstInput = [];


// on parcourt les langues
for(i, lLang = langue.length; i < lLang; i++){

	// on réinitialise j
	j = 0;

	// on parcourt les pages
	for(j, lPgs = pages.length; j < lPgs; j++){
		// on traduit la page et on l'enregistre
		translate(pages[j], langue[i]);
	}
}

console.log("Done !");

//===============================================================
// Fonction permettant de créer les pages html traduite
// "file" : (varchar) nom du fichier
// "pageTrad" : (varchar) page html traduite
// "langage" (varchar) langue dans laquelle la page est traduite
//===============================================================
function writeFilePage(file, pageTrad, langage){

	// on écrit les données traduites dans le nouveau fichier
	fs.writeFileSync('../pages/'+ langage + '/' + file + '-' + langage + '.html', pageTrad);
}
//======================================================================================
// Fonction permettant de traduire dans la langue choisie le contenu du site internet
// "id_page" (varchar) nom de la page courante
// "langage" (varchar) langage choisie
//======================================================================================
function translate(id_page, langage)
{
	// on récupère le contenu du fichier
	donneePage = fs.readFileSync('../templates/' + id_page + '.html', 'utf8').toString();

	// on transforme le contenu du fichier en html
	pageHTML = cheerio.load(donneePage, { decodeEntities: false });
		
	// on modifie le html lang
	if(id_page != "header" && id_page != "footer"){

		pageHTML("html").attr("lang", langage);
	}else{

		// on supprime les balises
		// "<html>"
		// "<head>"
		// "<body>"

		// on récupère le contenu du footer/header
		var html = pageHTML.html().substr(25, pageHTML.html().length - 39);

		// on insert le contenu mémorisé a la fin du fichier
		pageHTML(html).insertAfter("html");

		// on supprime tout ce que est avant la partie précèdement ajoutée
		pageHTML("html").remove();
	}

	// on récupère les textes et leurs traduction depuis un JSON
	data = fs.readFileSync('lang.json', 'utf8');

	// on parse les données en JSON
	var monJson = JSON.parse(data);

	// on parcourt le json
	for(var page in monJson) {
				
		// on obtient la page
	  //console.log('page : ' + page);

	  // vérification de la page
	  if(id_page + '.html' === page){

	  	// on traduit la page
	  	pageHTML = parcourirChampsJson(monJson[page], langage);
	
			//console.log(pageHTML.html());
			writeFilePage(id_page, pageHTML.html(), langage);
	  }	
	}
}

//================================================================================================
// Fonction permettant de parcourir un objet contenant les traduction d'une page d'un fichier JSON
// "page" : (varchar) objet contenant les traductions d'une page d'un fichier JSON
// "langage" : (varchar) langage choisie
//================================================================================================
function parcourirChampsJson(page, langage){

	// parcourt des liens 
	pageHTML('a').each(function(){

		// on récupère le lien
		var a = pageHTML(this).attr("href");

		// si le lien contient  ".html"
		if(a.indexOf(".html") > -1){

			// on récupère l'indice de ".html"
			var indiceHTML = a.indexOf(".html");

			// on récupère la partie avant .html
			var debutA = a.substr(0, indiceHTML);

			// on récupère la partie après .html
			var finA = a.substr(indiceHTML);

			// on ajoute la langue au nom du fichier
			var newA = debutA + '-' + langage + finA;

			// on modifie le lien 
			pageHTML(this).attr("href", newA);
		}
	});
	
	// on parcourt cette page
	for(var id in page){
		// on obtient l'id du texte
		//console.log("ID : " + id);
		
		// on parcourt cet id

		for(var language in page[id]){
			// on obtient la langue

			//console.log("Langue : " + language);

			// on obtient la langue et la traduction du texte dans cette langue
			//console.log("Traduction : " + page[id][language]);
			
			// test si c'est un input
			if (lstInput.indexOf(id) > -1) {

	  		// id est un input

	  		// si c'est la langue choisie
	  		if(language == langage){
	  			// on modifie la value cet input afin d'afficher le texte
	  			pageHTML('#' + id).attr("value", page[id][language]);
	  		}
	  	}else{

	  		// si c'est la langue choisie
	  		if(language == langage){
	  			// on ajoute le texte
	  			pageHTML('#' + id).text(page[id][language]);
	  		}
	  	}
		}
	}

	return pageHTML;
}