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
	$('.lang > a').each(function(){

		// au clique sur le drapeau anglais
		$(this).on("click", function(e){

			// pas de redirection
			e.preventDefault();

			// si la langue n'est pas déjà en englais
			if(!($(this).parent().hasClass('drapeau-actif'))){

				// on sauvegarde le choix en session
				sessionStorage.setItem('langue', $(this).attr('id'));
	
				// on traduit en anglais
				translate(page, $(this).attr('id'));
			}
		});
	});
}


