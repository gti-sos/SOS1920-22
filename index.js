var express = require('express');
var bodyParser = require('body-parser');

var baseURL = "api/v1";

app.use(bodyParser.json());

var app = express(); //Por convenio se crea así la variable.

var port = process.env.PORT || 3000; //Anyadido para Heroku L05.

app.use("/", express.static(__dirname+"/public/"));

app.get("/time", (req, res) => {
	console.log("Peticion enviada al servidor");
	res.send("<html>"+Date()+"</html>");
	
} );

app.listen(port, () => {
	console.log("Server ready fake");
});

console.log("Starting server...");

// Backlog L03. - 23/03/2020

var pilotos = [
	{ country: 'germany', year:'2019', totalpointnumber:568, pilotnumber: 5, victorynumber: 5 },
	{ country: 'france', year:'2019', totalpointnumber:32, pilotnumber: 3, victorynumber: 0  },
	{ country: 'united kingdom', year:'2014', totalpointnumber:475, pilotnumber: 4, victorynumber: 11 },
	{ country: 'spain', year:'2015', totalpointnumber:30, pilotnumber: 3, victorynumber: 0 },
	{ country: 'mexico', year:'2016', totalpointnumber:101, pilotnumber: 2, victorynumber: 0 }
];

//Cargar datos iniciales - Fórmula 1 - loadInitialData.
app.get(baseURL+"/formula-stats/loadInitialData", (req,res) => {
	res.send(JSON.stringify(pilotos,null,2));
	console.log("Data sent: "+JSON.stringify(pilotos,null,2));
})

//RECURSOS GENERALES - API REST - Fórmula 1

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
	//pilotos = pilots; - Podría machacarse los datos iniciales que les hemos metido.
	pilots = []; //MUCHÍSIMO OJO. SI BORRO TODO, ME DICE QUE NO HAY NADA. ES UN ARRAY VACÍO SIN NADA!!!!!!!!!!
	response.sendStatus(200);
});

// RECURSOS ESPECÍFICOS - FÓRMULA 1

app.get(baseURL + '/pilots/:country', (request, response) => {
	//Lo que hay detrás de los dos puntos no es siempre así.
	var aux = request.params.country; //Pillar el contenido después de los dos puntos.
	console.log(Date() + ' - GET /country - Recurso Específico' + aux);
	var filtro = pilotos.filter(n => n.country == aux);
	response.send(filtro);

});

app.post(baseURL + '/pilots/:country', (request, response) => {
	var aux = request.params.country;
	console.log(Date() + ' - POST /country - Recurso Específico ' + aux);
	response.send(405, "Method not allowed");
	//response.send(405);
});

app.delete(baseURL + '/pilots/:country', (request, response) => {
	//Lo que hay detrás de los dos puntos no es siempre así.
	var aux = request.params.country; //Pillar el contenido después de los dos puntos.
	console.log(Date() + ' - DELETE /pilots - Recurso Específico' + aux);
	var filtro = pilotos.filter(n => n.country != aux);
	pilotos = filtro;
	response.sendStatus(200);

});

app.put(baseURL + '/pilots/:country', (request, response) => {
	//Lo que hay detrás de los dos puntos no es siempre así.
	var aux = request.params.country; //Pillar el contenido después de los dos puntos.
	var name = request.body.country;
	if(aux != name){
		response.sendStatus(409);
		console.warn(Date()+ " Hacking Attempt !!!! ");
	}	
	else{
		console.log(Date() + ' - PUT /country - Recurso Específico ' + aux);
		var filtro = pilotos.filter(n => n.country != aux); //Aquí estoy quitando la nacionalidad que quiero cambiar.
		pilotos = filtro; // Aquí tengo todos las nacionalidades sin la que quiero modificar.
		pilotos.push(request.body); // Meto dentro del array la misma nacionalidad pero con sus datos modificados.
		response.sendStatus(200);
	}
	
});




