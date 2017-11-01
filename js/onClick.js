//----------------------------------------------------------------------------------------------------
// Fichier permettant de définir les actions au 'clic' des éléments d'une page 
//----------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------
// Fonction permettant permettant de gérer le clic des éléments de la page [accueil.html]
//----------------------------------------------------------------------------------------------------

function clickAcc() {
	// variables
	var gmail = $("#gmail"), drive = $("#drive");
	
	// Gmail
	gmail.on('click', function(){
		// ouverture d'un nouvel onglet contenant la page mail
		window.open("https://mail.google.com/mail/u/1/#inbox");
	});

	// Drive
	drive.on('click', function(){
		// ouverture d'un nouvel onglet contenant la page drive
		window.open("https://drive.google.com/drive/u/1/my-drive");
	});
}

//----------------------------------------------------------------------------------------------------
// Fonction permettant de changer la langue en fonction du drapeau sur lequel on clique
// 'page' (varchar) id de la page à traduire
//----------------------------------------------------------------------------------------------------
function changeTranslate(page)
{
	// nombres de langues
	var nbLang = $('.lang > a').length,
	i =0;
	
	// parcourt des langues
	console.log(nbLang);

	$('.lang > a').each(function(){
		console.log($(this));
		// au clique sur le drapeau anglais
		$(this).on("click", function(e){

			// pas de redirection
			e.preventDefault();

			// si la langue n'est pas déjà en englais
			if(!($(this).hasClass('drapeau-actif'))){

				// on sauvegarde le choix en session
				sessionStorage.setItem('langue', $(this).attr('id'));

				// on enlève la classe actif sur l'autre drapeau
				$('.lang > a').removeClass('drapeau-actif');

				// on met le drapeau cliqué en actif
				$(this).addClass('drapeau-actif');
				
				// on traduit en anglais
				translate(page, $(this).attr('id'));
			}
		});
	});
	
	// A FAIRE

	/*// au clique sur le drapeau anglais
	$('#en').on("click", function(e){

		// pas de redirection
		e.preventDefault();

		// si la langue n'est pas déjà en englais
		if(!($(this).hasClass('drapeau-actif'))){

			// on sauvegarde le choix en session
			sessionStorage.setItem('langue', 'eng');

			// on met le drapeau cliqué en actif
			$("#en").addClass('drapeau-actif');

			// on enlève la classe actif sur l'autre drapeau
			$("#fr").removeClass('drapeau-actif');
			
			// on traduit en anglais
			translate(page, "en");
		}
	});*/

	/*$('#fr').on("click", function(e){
		
		// pas de redirection
		e.preventDefault();

		// si la langue n'est pas déjà en francais
		if(!($(this).hasClass('drapeau-actif'))){

			// on sauvegarde le choix en session
			sessionStorage.setItem('langue', 'fr');

			// on met le drapeau cliqué en actif
			$("#fr").addClass('drapeau-actif');

			// on enlève la classe actif sur l'autre drapeau
			$("#en").removeClass('drapeau-actif');
			
			// on traduit en francais
			translate(page, "fr");
		}
	});*/
}


