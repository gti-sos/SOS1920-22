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
	app.get(baseURL + '/formula-stats/loadInitialData', (req, res) => {
		pilotos = pilotosInitialData.slice();
		res.send(pilotos);
		console.log('Data sent: ' + JSON.stringify(pilotos, null, 2));
	});

	app.get(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - GET /formula-stats');
		response.send(pilotos);
		//No es necesario enviar un código de estado, si devuelve el conjunto de datos
		//automáticamente manda un 200 OK.
	});

	app.post(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - POST /formula-stats');
		var aux = request.body; // Objeto entero - Si quiero acceder a algo concreto con el .name.
		pilotos.push(aux);
		response.sendStatus(201);
	});

	app.put(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - PUT /formula-stats');
		response.send(405);
	});

	app.delete(baseURL + '/formula-stats', (request, response) => {
		console.log(Date() + ' - DELETE /formula-stats');
		//pilotos = pilots; - Podría machacarse los datos iniciales que les hemos metido. - HE MODIFICADO PILOTS EN VEZ DE 			PILOTOS.
		pilotos = []; //MUCHÍSIMO OJO. SI BORRO TODO, ME DICE QUE NO HAY NADA. ES UN ARRAY VACÍO SIN NADA!!!!!!!!!!
		response.sendStatus(200);
	});

	// RECURSOS ESPECÍFICOS - FÓRMULA 1

	app.get(baseURL + '/formula-stats/:country', (request, response) => {
		//Lo que hay detrás de los dos puntos no es siempre así.
		var aux = request.params.country; //Pillar el contenido después de los dos puntos.
		console.log(Date() + ' - GET /country - Recurso Específico' + aux);
		var filtro = pilotos.filter(n => n.country == aux);
		response.send(filtro[0]);
	});

	app.post(baseURL + '/formula-stats/:country', (request, response) => {
		var aux = request.params.country;
		console.log(Date() + ' - POST /country - Recurso Específico ' + aux);
		response.send(405, 'Method not allowed');
		//response.send(405);
	});

	app.delete(baseURL + '/formula-stats/:country', (request, response) => {
		//Lo que hay detrás de los dos puntos no es siempre así.
		var aux = request.params.country; //Pillar el contenido después de los dos puntos.
		console.log(Date() + ' - DELETE /pilots - Recurso Específico' + aux);
		var filtro = pilotos.filter(n => n.country != aux);
		pilotos = filtro;
		response.sendStatus(200);
	});

	app.put(baseURL + '/formula-stats/:country', (request, response) => {
		//Lo que hay detrás de los dos puntos no es siempre así.
		var aux = request.params.country; //Pillar el contenido después de los dos puntos.
		var name = request.body.country;
		if (aux != name) {
			response.sendStatus(409);
			console.warn(Date() + ' Hacking Attempt !!!! ');
		} else {
			console.log(Date() + ' - PUT /country - Recurso Específico ' + aux);
			var filtro = pilotos.filter(n => n.country != aux); //Aquí estoy quitando la nacionalidad que quiero cambiar.
			pilotos = filtro; // Aquí tengo todos las nacionalidades sin la que quiero modificar.
			pilotos.push(request.body); // Meto dentro del array la misma nacionalidad pero con sus datos modificados.
			response.sendStatus(200);
		}
	});
};