Hooks.once("init", function() {
    console.log("Incializando módulo Escoria Rebelde")

    game.settings.register("escoria-rebelde-csb", "firstTimeStart", {
        name: "Forzar mensaje de Bienvenida",
        hint: "Si marcas esta casilla te aparecerá el mensaje de bienvenida en el chat la próxima vez que entres.",
        scope: "client",
        config: true,
        default: false,
        type: Boolean
    })
})

Hooks.once("ready", function() {
	let forzarbienvenida=game.settings.get("escoria-rebelde-csb", "firstTimeStart");
	let forzarmensaje;
	console.log(forzarmensaje);
	if (forzarbienvenida==true) {
		forzarmensaje=true;
	}
	let versactual=game.modules.get("escoria-rebelde-csb").version;
	let userisGM=game.user.isGM;
	if (userisGM) {
		if(!game.user.getFlag("escoria-rebelde-csb", "welcomeMessage") || forzarmensaje==true) {
			console.log('lalala');
			let buttonId2=Date.now()+2;
			let msg='<h2>Bienvenido al módulo de Escoria Rebelde</h2><p>Importa los compendios para poder empezar a usar el módulo</p><button id='+buttonId2+' >Importa los compendios</button>';
			ChatMessage.create({
        		speaker: {alias:"Barón Deathray"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection2 = game.packs.get("escoria-rebelde-csb.templatesactores");
						let folderident2=''
						if (game.folders.getName("Templates_Actores")) {
							folderident2=game.folders.getName("Templates_Actores").id;
						}
						let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates_Actores", keepId: true});
						game.user.setFlag("escoria-rebelde-csb", "welcomeMessage", true);
						game.user.setFlag("escoria-rebelde-csb", "lastVersion", game.modules.get("escoria-rebelde-csb").version);
					});
				}
				}, 100);
			});
			game.settings.set("escoria-rebelde-csb", "firstTimeStart", false);
		} else if (versactual!=game.user.getFlag("escoria-rebelde-csb", "lastVersion")) {
			let buttonId2=Date.now()+2;
			let msg='<h2>Bienvenido al módulo de Escoria Rebelde</h2><p>Se ha actualizado el módulo desde la última vez que lo usaste. Importa los compendios para tener la última versión de las Templates de actores</p><button id='+buttonId2+' >Importa los compendios</button>';
			ChatMessage.create({
					speaker: {alias:"Barón Deathray"},
					content: msg,
			   whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection2 = game.packs.get("escoria-rebelde-csb.templatesactores");
						let folderident2=''
						if (game.folders.getName("Templates_Actores")) {
							folderident2=game.folders.getName("Templates_Actores").id;
						}
						let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates_Actores", keepId: true});
						game.user.setFlag("escoria-rebelde-csb", "lastVersion", game.modules.get("escoria-rebelde-csb").version);
					});
				}
				}, 500);
			});
		}
	} else if (!game.user.getFlag("escoria-rebelde-csb", "welcomeMessage") || forzarmensaje==true) {
		let buttonId=Date.now();
		let msg = '<h2>Bienvenido al módulo de Escoria Rebelde</h2>'
		ChatMessage.create({
        		speaker: {alias:"Barón Deathray"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
		})
		game.user.setFlag("escoria-rebelde-csb", "welcomeMessage", true);
		game.settings.set("escoria-rebelde-csb", "firstTimeStart", false);
	}
})