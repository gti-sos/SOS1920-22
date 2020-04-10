//console.log("My test module");

//var objeto = {};

//objeto.console = function(){
//	console.log("My test objeto");
//}

//module.exports = objeto;

var formula1API = {};

module.exports = formula1API;

formula1API.methods = function(app, pilotosInitialData, pilotos, baseURL, dbformula1) {
	
	//Cargar datos iniciales - Fórmula 1 - loadInitialData.
	//app.get(baseURL + '/formula-stats/loadInitialData', (req, res) => {
	//	pilotos = pilotosInitialData.slice();
	//	res.send(pilotos);
	//	console.log('Data sent: ' + JSON.stringify(pilotos, null, 2));
	//});
	
	//Actualización de Load Initial Data a 08/04/2020 para el D01
	app.get(baseURL+"/formula-stats/loadInitialData", (request,response) =>{
        dbformula1.remove({});
        dbformula1.insert(pilotosInitialData);
        response.sendStatus(200);
        console.log("Initial data loaded:"+JSON.stringify(pilotosInitialData,null,2));
    })

	//app.get(baseURL + '/formula-stats', (request, response) => {
	//	console.log(Date() + ' - GET /formula-stats');
	//	response.send(pilotos);
		//No es necesario enviar un código de estado, si devuelve el conjunto de datos
		//automáticamente manda un 200 OK.
	//});
	
	//RECURSOS GENERALES
	
	app.get(baseURL + '/formula-stats', (request, response) => {
		
		console.log(Date() + ' - GET /formula-stats');
		
		//AQUÍ SE METEN LAS BÚSQUEDAS
		var limit = parseInt(request.query.limit); //De 10 en 10
        var offset = parseInt(request.query.offset); //Hasta 100

        var from = parseInt(request.query.from);
        var to = parseInt(request.query.to);

        var country = request.query.country;
        var year = parseInt(request.query.year);
		//Estos 3 tengo que verlo con más calma - 08/04/2020
        var totalPointNumber = parseInt(request.query.totalPointNumber);
        var numPilotos = parseInt(request.query.numPilotos);
        var numVictorias = parseInt(request.query.numVictorias);
		
		//Primera búsqueda
		if(from && to){
			 dbformula1.find({year: {$gte: from, $lte: to}}).skip(offset).limit(limit).exec((err, pilotos)=>{
				 if(pilotos.length == 0){
					 response.sendStatus(404, "Not found");
				 }
				 else{
					 pilotos.forEach((n) => {
						 delete n._id;
					 });
					response.send(JSON.stringify(pilotos,null,2));
				 }
			 });
		}
		//Segunda parte de la búsqueda
		else if(country | year | totalPointNumber | numPilotos | numVictorias){
			if(!year && !totalPointNumber && !numPilotos && !numVictorias){
				dbformula1.find({"country":country}).skip(offset).limit(limit).exec((err, pilotos)=>{
					if(pilotos.length==0){
						response.sendStatus(404, "Not found");
					}
					else{
						pilotos.forEach((n) => {
							delete n_id;
						});
					response.send(JSON.stringify(pilotos, null, 2));
					}
				});
			}
			else if(!country && !totalPointNumber && !numPilotos && !numVictorias){
				dbformula1.find({"year":year}).skip(offset).limit(limit).exec((err, pilotos)=>{
					if(pilotos.length==0){
						response.sendStatus(404, "Not found");
					}
					else{
						pilotos.forEach((n) => {
							delete n_id;
						});
						response.send(JSON.stringify(pilotos,null,2));
					}
				});
			}
			else if(!country && !year && !numPilotos && !numVictorias){
				dbformula1.find({"totalPointNumber":totalPointNumber}).skip(offset).limit(limit).exec((err, pilotos) => {
					if(pilotos.length == 0){
						response.sendStatus(404, "Not found");
					}
					else{
						pilotos.forEach((n) => {
							delete n_id;
						});
						response.send(JSON.stringify(pilotos, null, 2));
					}
				});
			}
			else if(!country && !year && !totalPointNumber && !numVictorias){
				dbformula1.find({"numPilotos":numPilotos}).skip(offset).limit(limit).exec((err, pilotos) => {
					if(pilotos.length == 0){
						response.sendStatus(404, "Not found");
					}
					else{
						pilotos.forEach((n) => {
							delete n_id;
						});
						response.send(JSON.stringify(pilotos, null, 2));
					}
				});
			}
			else if(!country && !year && !numPilotos && !totalPointNumber){
				dbformula1.find({"numVictorias":numVictorias}).skip(offset).limit(limit).exec((err, pilotos) => {
					if(pilotos.length == 0){
						response.sendStatus(404, "Not found");
					}
					else{
						pilotos.forEach((n) => {
							delete n_id;
						});
						response.send(JSON.stringify(pilotos, null, 2));
					}
				});
			}
			else if(!totalPointNumber && !numPilotos && !totalPointNumber){
				dbformula1.find({"country":country, "year":year}).skip(offset).limit(limit).exec((err, pilotos) => {
					if(pilotos.length == 0){
						response.sendStatus(404, "Not found");
					}
					else{
						pilotos.forEach((n) => {
							delete n_id;
						});
						response.send(JSON.stringify(pilotos, null, 2));
					}
				});
			}
		}
		else{
			dbformula1.find({}).skip(offset).limit(limit).exec((err, pilotos) =>{
				pilotos.forEach((n) => {
					delete n_id;
				});
				response.send(JSON.stringify(pilotos, null, 2));
			});
		};
	});
		
	//COMENTADA PARTE JOSENRI - response.send(pilotos); - Hay comentario de esto porque no estoy seguro de poder enviarlo.
	//	dbformula1.find({}, (error, formula1) => {
	//		if(error){
	//			console.error("Error accessing DataBase");
	//			response.sendStatus(500);
	//		}
	//		response.send(formula1);
	//	});
		//No es necesario enviar un código de estado, si devuelve el conjunto de datos
		//automáticamente manda un 200 OK.
	//});

	app.post(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - POST /formula-stats');
		var aux = request.body; // Objeto entero - Si quiero acceder a algo concreto con el .name.
		//pilotos.push(aux);
		dbformula1.insert(aux);
		response.sendStatus(201);
	});

	app.put(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - PUT /formula-stats');
		response.send(405);
	});

	app.delete(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - DELETE /formula-stats');
		//pilotos = pilots; - Podría machacarse los datos iniciales que les hemos metido. - HE MODIFICADO PILOTS EN VEZ DE 			//PILOTOS.
		//pilotos = []; //MUCHÍSIMO OJO. SI BORRO TODO, ME DICE QUE NO HAY NADA. ES UN ARRAY VACÍO SIN NADA!!!!!!!!!!
		db.remove({}, {multi:true}, (error, numDelete) => {
			console.log(numDelete + "nationalities deleted");
		});
		response.sendStatus(200);
	});

	// RECURSOS ESPECÍFICOS - FÓRMULA 1
	
	//Falta por corregir esta parte: realmente sería '/formula-stats/:country/:year'
	app.get(baseURL + '/formula-stats/:country/:year', (request, response) => {
		//Lo que hay detrás de los dos puntos no es siempre así.
		var aux = request.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(request.params.year);
		
		dbformula1.find({"country": aux, "year": country}).exec((err, pilotos) => {
			if(pilotos.length == 0){
				delete pilotos[0]._id;
				
				response.send(JSON.stringify(pilotos[0],null,2));
				console.log("/GET - Recurso Específico /country/year: " + JSON.stringify(pilotos[0]), null, 2);
			}
			else{
				response.sendStatus(404, "Not found");
			}
		});
		//Método get sin DB.
		//console.log(Date() + ' - GET /country - Recurso Específico' + aux);
		//var filtro = pilotos.filter(n => n.country == aux);
		//response.send(filtro[0]);
	});
	
	//Falta por corregir esta parte: realmente sería '/formula-stats/:country/:year'
	app.post(baseURL + '/formula-stats/:country/:year', (request, response) => {
		//Can we get this variable: var aux = request.params.country.year; ?????
		var aux = request.params.country;
		var year = request.params.year;
		console.log(Date() + ' - POST /country/year - Recurso Específico ');
		response.send(405, 'Method not allowed');
		//response.send(405);
	});
	
	//Falta por corregir esta parte: realmente sería '/formula-stats/:country/:year'
	app.delete(baseURL + '/formula-stats/:country/:year', (request, response) => {
		//Lo que hay detrás de los dos puntos no es siempre así.
		var aux = request.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(request.params.year);
		
		console.log(Date() + ' - DELETE /formula-stats - Recurso Específico');
		
		dbformula1.remove({"country": aux, "year": year}, {multi:true}, (err, pilotsDeleted) => {
			if(pilotosDeleted == 0){
				response.sendStatus(404, "Not found");
			}
			else{
				response.sendStatus(200);
			}
		});
		
		//var filtro = pilotos.filter(n => n.country != aux);
		//pilotos = filtro;
		//response.sendStatus(200);
	});
	//Falta por corregir esta parte: realmente sería '/formula-stats/:country/:year'
	app.put(baseURL + '/formula-stats/:country/:year', (request, response) => {
		//Lo que hay detrás de los dos puntos no es siempre así.
		var aux = request.params.country; //Pillar el contenido después de los dos puntos.
		var name = request.body.country;
		var year = request.params.year;
		if (aux != name) {
			response.sendStatus(409);
			console.warn(Date() + ' Hacking Attempt !!!! ');
		} 
		else {
			console.log(Date() + ' - PUT /country - Recurso Específico ' + aux);
			var filtro = pilotos.filter(n => n.country != aux); //Aquí estoy quitando la nacionalidad que quiero cambiar.
			pilotos = filtro; // Aquí tengo todos las nacionalidades sin la que quiero modificar.
			pilotos.push(request.body); // Meto dentro del array la misma nacionalidad pero con sus datos modificados.
			response.sendStatus(200);
		}
	});
};