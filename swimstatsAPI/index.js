module.exports = function(app){
	console.log(Date() + " Registering Swimmers API");
	
	const dataStore = require("nedb");
	const path = require("path");
	const baseURL = "/api/v1";
	const dbFileName = path.join(__dirname, "swimmers.db");
	
	const db = new dataStore({
		filename: dbFileName,
		autoload: true
	});
	
	var nadadoresInitialData = [
	{ country: 'brazil', year:2009, yearofbirth:1987, position: 1, time: 20.91 },
	{ country: 'france', year:2009, yearofbirth:1981, position: 2, time: 20.94 },
	{ country: 'korea', year:2019, yearofbirth:1996, position: 3, time: 21.04 },
	{ country: 'italy', year:2009, yearofbirth:1987, position: 4, time: 21.08 },
	{ country: 'united kingdom', year:2018, yearofbirth:1994, position: 5, time: 21.11 },
];

	
	//Si no pongo esta línea, al hacer el get al recurso general no funciona.
	db.insert(nadadoresInitialData);
	
	app.get(baseURL + "/swim-stats/loadInitialData", (request, response) => {

		console.log("New GET .../loadInitialData");
	
		db.remove({}, {multi:true});
        db.insert(nadadoresInitialData);
        response.send(JSON.stringify(nadadoresInitialData,null,2));
        console.log("Initial data loaded:"+JSON.stringify(nadadoresInitialData,null,2));
	});
	
	app.get(baseURL+"/swim-stats", (request, response) => {
		console.log(Date() + "GET general de swim 1 API");
		
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
		if(query.hasOwnProperty("yearofbirth")){
			query.yearofbirth = parseInt(query.yearofbirth);
			console.log(query.yearofbirth);
		}
		if(query.hasOwnProperty("position")){
			query.position = parseInt(query.position);
			console.log(query.position);
		}
		if(query.hasOwnProperty("time")){
			query.time = parseDouble(query.time);
			console.log(query.time);
		}
		
		console.log(query);
		
		db.find(query).skip(offset).limit(limit).exec((error, swimmers) => {
			swimmers.forEach((n) => {
				delete n._id;
		});
		
		//Si no pongo 0, al hacer un delete general no me deja. MUCHO OJO CON ESTO
		if (swimmers.length < 0) {
			response.sendStatus(400, "Bad request");
			console.log("Requested data is INVALID");
		}
		else{
			response.send(JSON.stringify(swimmers, null, 2));
			console.log("Data sent:"+JSON.stringify(swimmers, null, 2));
	
		}});
		
	});
	
	app.post(baseURL + '/swim-stats', (request, response) => {
		console.log(Date() + ' - POST /swim-stats');
		
		var aux = request.body; // Objeto entero - Si quiero acceder a algo concreto con el .name.
		
		if((aux == null) || (aux.position == null) || (aux.year == null) || (aux.yearofbirth==null) || 	(aux.time == null) || (aux.country == null) || (Object.keys(aux).length != 5)){
			response.sendStatus(400, "Falta uno o más campos");
			console.log("POST not created");
		}
		else{
			db.insert(aux);
			response.sendStatus(201, "Post created");
			console.log(JSON.stringify(aux, null, 2));
		}
		
	});
	
	app.put(baseURL + '/swim-stats', (request, response) => {
		console.log(Date() + ' - PUT /swim-stats');
		response.send(405);
	});
	
	app.delete(baseURL + '/swim-stats', (request, response) => {
		console.log(Date() + ' - DELETE /swim-stats');
		
		db.remove({}, {multi:true}, (error, numDelete) => {
			console.log(numDelete + " nationalities deleted");
		});
		response.sendStatus(200, "OK");
	});
	
	app.get(baseURL + '/swim-stats/:position', (request, response) => {
		console.log(Date() + ' - GET /swim-stats/:position');
		
		var aux = request.params.position; //Pillar el contenido después de los dos puntos.
		
		db.find({"position": aux}).exec((err, nadadores) => {
			if(nadadores.length == 1){
				delete nadadores[0]._id;
				
				response.send(JSON.stringify(nadadores[0],null,2));
				console.log("/GET - Recurso Específico /position: " + JSON.stringify(nadadores[0]), null, 2);
			}
			else{
				response.sendStatus(404, "Not found");
			}
		});
		
	});
	
	app.post(baseURL + '/swim-stats/:position', (request, response) => {
		var aux = request.params.position;
		
		console.log(Date() + ' - POST /position - Recurso Específico ');
		response.send(405, 'Method not allowed');
	});
	
	app.put(baseURL + '/swim-stats/:position', (request, response) => {
		console.log(Date() + ' - PUT /swim-stats/:position');
		
		var aux = request.params.position; //Pillar el contenido después de los dos puntos.
		var position = request.body.position;
		
		var body = request.body;
		
		if (aux != position) {
			response.sendStatus(409);
			console.warn(Date() + ' Hacking Attempt! ');
		}
		else {
			db.update({"position": aux}, body, (err, nadadoresUpdated) => {
				if(nadadoresUpdatedUpdated == 0){
					response.sendStatus(404, "Not found");
				}
				else{
					response.sendStatus(200);
					console.log(Date() + ' - PUT /position - Recurso Específico ');
				}
			});
		}
	});
	
	app.delete(baseURL + '/swim-stats/:position', (request, response) => {
		console.log(Date() + ' - DELETE /swim-stats/:position');
		
		//Lo que hay detrás de los dos puntos no es siempre así.
		var aux = request.params.position; //Pillar el contenido después de los dos puntos.
		
		db.remove({"position": aux}, {multi:true}, (err, nadadoresDeleted) => {
			if(nadadoresDeleted == 0){
				response.sendStatus(404, "Not found");
			}
			else{
				response.sendStatus(200);
			}
		});
		
	});
	
}