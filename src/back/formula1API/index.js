module.exports = function(app){
	//Haciendo prueba para ver si funciona un push a GitHub desde Visual Studio
	console.log(Date() + " Registering Formula 1 API");
	
	const dataStore = require("nedb");
	const path = require("path");
	const baseURL = "/api/v2";
	const dbFileName = path.join(__dirname, "formula1.db");
	
	const db = new dataStore({
		filename: dbFileName,
		autoload: true
	});
	
	var pilotosInitialData = [
		{ country: 'germany', year:2019, totalpointnumber:568, pilotnumber: 5, victorynumber: 5 },
		{ country: 'france', year:2019, totalpointnumber:32, pilotnumber: 3, victorynumber: 0  },
		{ country: 'united_kingdom', year:2014, totalpointnumber:475, pilotnumber: 4, victorynumber: 11 },
		{ country: 'spain', year:2015, totalpointnumber:30, pilotnumber: 3, victorynumber: 0 },
		{ country: 'mexico', year:2016, totalpointnumber:101, pilotnumber: 2, victorynumber: 0 }
		
		
		/*,
		{ country: 'germany', year:2014, totalpointnumber:568, pilotnumber: 5, victorynumber: 5 },
		{ country: 'finland', year:2014, totalpointnumber:225, pilotnumber: 2, victorynumber: 0 },
		{ country: 'brazil', year:2014, totalpointnumber:116, pilotnumber: 1, victorynumber: 0 },
		{ country: 'spain', year:2014, totalpointnumber:159, pilotnumber: 1, victorynumber: 0 },
		{ country: 'denmark', year:2014, totalpointnumber:55, pilotnumber: 1, victorynumber: 0 },
		{ country: 'france', year:2014, totalpointnumber:33, pilotnumber: 3, victorynumber: 0 },
		{ country: 'russia', year:2014, totalpointnumber:8, pilotnumber: 1, victorynumber: 0 },*/
	];
	
	//Si no pongo esta línea, al hacer el get al recurso general no funciona.
	//db.insert(pilotosInitialData);
	
	app.get(baseURL + "/formula-stats/loadInitialData", (request, response) => {

		console.log("New GET .../loadInitialData");
		//var formula1 = db.getAllData();
	
		db.remove({}, {multi:true});
        db.insert(pilotosInitialData);
        response.send(JSON.stringify(pilotosInitialData,null,2));
        console.log("Initial data loaded:"+JSON.stringify(pilotosInitialData,null,2));
	});
	
	app.get(baseURL+"/formula-stats", (request, response) => {
		console.log(Date() + "GET general de Fórmula 1 API");
		
		var query = request.query;
		
		//Comprobación de cómo entra el query.
		console.log(query);
		
		//Aquí se obtienen offset y limit con query, si son null, le hacemos un delete y listo.
		var offset = query.offset;
		var limit = query.limit;
		
		//Deleteamos los offset y limit.
		delete query.offset;
		delete query.limit;
		
		//Parseamos el año a Integer, mis otras 3 propiedades numéricas también son necesarias.
		if(query.hasOwnProperty("year")){
			query.year = parseInt(query.year);	
			console.log(query.year);
		}
		//ESTA PROPIEDAD NO HACE FALTA DEBIDO A QUE NO HACE FALTA PARSEAR STRINGS!!!!!!!
		
		/*if(query.hasOwnProperty("country")){
			query.country = parseInt(query.country);
			console.log(query.country);
		}*/
		if(query.hasOwnProperty("totalpointnumber")){
			query.totalpointnumber = parseInt(query.totalpointnumber);
			console.log(query.totalpointnumber);
		}
		if(query.hasOwnProperty("victorynumber")){
			query.victorynumber = parseInt(query.victorynumber);
			console.log(query.victorynumber);
		}
		if(query.hasOwnProperty("pilotnumber")){
			query.pilotnumber = parseInt(query.pilotnumber);
			console.log(query.pilotnumber);
		}
		
		console.log(query);
		
		db.find(query).skip(offset).limit(limit).exec((error, formula1) => {
			formula1.forEach((n) => {
				delete n._id;
		});
		
		//Si no pongo 0, al hacer un delete general no me deja. MUCHO OJO CON ESTO
		if (formula1.length < 0) {
			response.sendStatus(400, "Bad request");
			console.log("Requested data is INVALID");
		}
		else{
			response.send(JSON.stringify(formula1, null, 2));
			console.log("Data sent:"+JSON.stringify(formula1, null, 2));
	
		}});
		
	});
	
	app.post(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - POST /formula-stats');
		
		var aux = request.body; // Objeto entero - Si quiero acceder a algo concreto con el .name.
		var year = request.body.year;
		var country = request.body.country;
		
		db.find({"country": country, "year": year}).exec((error, formula1) => {
			if(formula1.length > 0){
				response.sendStatus(409);
				console.log("There's an object with those primary keys");
				return;
			}
			if((aux == null) || (aux.country == null) || (aux.year == null) || (aux.totalpointnumber==null) || 	(aux.pilotnumber == null) || (aux.victorynumber == null) || ((Object.keys(aux).length != 5))){
			response.sendStatus(400, "Falta uno o más campos");
			console.log(aux);
			console.log("POST not created");
			return;
			}
			db.insert(aux);
			response.sendStatus(201, "Post created");
			console.log(JSON.stringify(aux, null, 2));
		}); 
		
	});
	
	app.put(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - PUT /formula-stats');
		response.send(405);
	});
	
	app.delete(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - DELETE /formula-stats');
		
		db.remove({}, {multi:true}, (error, numDelete) => {
			console.log(numDelete + " nationalities deleted");
		});
		response.sendStatus(200, "OK");
	});
	
	app.get(baseURL + '/formula-stats/:country/:year', (request, response) => {
		console.log(Date() + ' - GET /formula-stats/:country/:year');
		
		var aux = request.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(request.params.year);
		
		db.find({"country": aux, "year": year}).exec((err, pilotos) => {
			if(pilotos.length == 1){
				delete pilotos[0]._id;
				
				response.send(JSON.stringify(pilotos[0],null,2));
				console.log("/GET - Recurso Específico /country/year: " + JSON.stringify(pilotos[0]), null, 2);
			}
			else{
				response.sendStatus(404, "Not found");
			}
		});
		
	});
	
	app.post(baseURL + '/formula-stats/:country/:year', (request, response) => {
		//Can we get this variable: var aux = request.params.country.year; ?????
		var aux = request.params.country;
		var year = request.params.year;
		
		console.log(Date() + ' - POST /country/year - Recurso Específico ');
		response.send(405, 'Method not allowed');
		//response.send(405);
	});
	
	app.put(baseURL + '/formula-stats/:country/:year', (request, response) => {
		console.log(Date() + ' - PUT /formula-stats/:country/:year');
		
		var aux = request.params.country; //Pillar el contenido después de los dos puntos.
		var name = request.body.country;
		
		var year = parseInt(request.params.year);
		var yearBody = parseInt(request.body.year);
		
		var body = request.body;
		
		if (aux != name || year != yearBody) {
			response.sendStatus(409);
			console.warn(Date() + ' Hacking Attempt !!!! ');
		}
		else {
			db.update({"country": aux, "year": year }, body, (err, pilotosUpdated) => {
				if(pilotosUpdated == 0){
					response.sendStatus(404, "Not found");
				}
				else{
					response.sendStatus(200);
					console.log(Date() + ' - PUT /country - Recurso Específico ');
				}
			});
		}
	});
	
	app.delete(baseURL + '/formula-stats/:country/:year', (request, response) => {
		console.log(Date() + ' - DELETE /formula-stats/:country/:year');
		
		//Lo que hay detrás de los dos puntos no es siempre así.
		var aux = request.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(request.params.year);
		
		db.remove({"country": aux, "year": year}, {multi:true}, (err, pilotsDeleted) => {
			if(pilotsDeleted == 0){
				response.sendStatus(404, "Not found");
			}
			else{
				response.sendStatus(200);
			}
		});
		
	});
	
}