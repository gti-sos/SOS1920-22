var express = require('express');
var bodyParser = require('body-parser');

var baseURL = "/api/v1";

var app = express(); //Por convenio se crea así la variable.

var port = process.env.PORT || 3000; //Anyadido para Heroku L05.

app.use(bodyParser.json());

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
	{ country: 'germany', year:2019, totalpointnumber:568, pilotnumber: 5, victorynumber: 5 },
	{ country: 'france', year:2019, totalpointnumber:32, pilotnumber: 3, victorynumber: 0  },
	{ country: 'united kingdom', year:2014, totalpointnumber:475, pilotnumber: 4, victorynumber: 11 },
	{ country: 'spain', year:2015, totalpointnumber:30, pilotnumber: 3, victorynumber: 0 },
	{ country: 'mexico', year:2016, totalpointnumber:101, pilotnumber: 2, victorynumber: 0 }
];

var pilotosInitialData = [
	{ country: 'germany', year:2019, totalpointnumber:568, pilotnumber: 5, victorynumber: 5 },
	{ country: 'france', year:2019, totalpointnumber:32, pilotnumber: 3, victorynumber: 0  },
	{ country: 'united kingdom', year:2014, totalpointnumber:475, pilotnumber: 4, victorynumber: 11 },
	{ country: 'spain', year:2015, totalpointnumber:30, pilotnumber: 3, victorynumber: 0 },
	{ country: 'mexico', year:2016, totalpointnumber:101, pilotnumber: 2, victorynumber: 0 }
];

var nadadores = [
	{ country: 'brazil', year:2009, yearofbirth:1987, position: 1, time: 20.91 },
	{ country: 'france', year:2009, yearofbirth:1981, position: 2, time: 20.94 },
	{ country: 'korea', year:2019, yearofbirth:1996, position: 3, time: 21.04 },
	{ country: 'italy', year:2009, yearofbirth:1987, position: 4, time: 21.08 },
	{ country: 'united kingdom', year:2018, yearofbirth:1994, position: 5, time: 21.11 },
];

var nadadoresInitialData = [
	{ country: 'brazil', year:2009, yearofbirth:1987, position: 1, time: 20.91 },
	{ country: 'france', year:2009, yearofbirth:1981, position: 2, time: 20.94 },
	{ country: 'korea', year:2019, yearofbirth:1996, position: 3, time: 21.04 },
	{ country: 'italy', year:2009, yearofbirth:1987, position: 4, time: 21.08 },
	{ country: 'united kingdom', year:2018, yearofbirth:1994, position: 5, time: 21.11 },
];

var baloncesto = [
	{ country: 'serbia', year:2016, points:66, threepoints: 4, rebounds: 33 },
	{ country: 'spain', year:2012, points:100, threepoints: 7, rebounds: 35 },
	{ country: 'spain', year:2008, points:107, threepoints: 8, rebounds: 37 },
	{ country: 'italy', year:2004, points:69, threepoints: 11, rebounds: 26 },
	{ country: 'france', year:2000, points:75, threepoints: 6, rebounds: 20 },
];
var baloncestoInitialData = [
	{ country: 'serbia', year:2016, points:66, threepoints: 4, rebounds: 33 },
	{ country: 'spain', year:2012, points:100, threepoints: 7, rebounds: 35 },
	{ country: 'spain', year:2008, points:107, threepoints: 8, rebounds: 37 },
	{ country: 'italy', year:2004, points:69, threepoints: 11, rebounds: 26 },
	{ country: 'france', year:2000, points:75, threepoints: 6, rebounds: 20 },
];


//Cargar datos iniciales - Fórmula 1 - loadInitialData.
app.get(baseURL+"/formula-stats/loadInitialData", (req,res) => {
	pilotos = pilotosInitialData;
	res.send(pilotos);
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
	//pilotos = pilots; - Podría machacarse los datos iniciales que les hemos metido. - HE MODIFICADO PILOTS EN VEZ DE PILOTOS.
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
	response.send(405, "Method not allowed");
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

//Cargar datos iniciales - Natación - loadInitialData.
app.get(baseURL+"/swim-stats/loadInitialData", (req,res) => {
	nadadores = nadadoresInitialData;
	res.send(200, 'Los datos iniciales se han cargado.');
	console.log("Data sent: "+JSON.stringify(nadadores,null,2));
})

//RECURSOS GENERALES - API REST - Natacion

app.get(baseURL + '/swim-stats', (request, response) => {
	console.log(Date() + ' - GET /swim-stats');
	response.send(nadadores);
});

app.post(baseURL + '/swim-stats', (request, response) => {
	console.log(Date() + ' - POST /swim-stats');
	var aux = request.body;
	nadadores.push(aux);
	response.sendStatus(201);
});

app.put(baseURL + '/swim-stats', (request, response) => {
	console.log(Date() + ' - PUT /swim-stats');
	response.send(405);
});

app.delete(baseURL + '/swim-stats', (request, response) => {
	console.log(Date() + ' - DELETE /swim-stats');
	//swimmers = swimmers;
	nadadores = [];
	response.sendStatus(200);
});

// RECURSOS ESPECÍFICOS - NATACIÓN

app.get(baseURL + '/swim-stats/:position', (request, response) => {
	var aux = request.params.position;
	console.log(Date() + ' - GET /position - Recurso Específico' + aux);
	var filtro = nadadores.filter(n => n.position == aux);
	response.send(filtro[0]);

});

app.post(baseURL + '/swim-stats/:position', (request, response) => {
	var aux = request.params.position;
	console.log(Date() + ' - POST /position - Recurso Específico ' + aux);
	response.send(405, "Method not allowed");
});

app.delete(baseURL + '/swim-stats/:position', (request, response) => {
	var aux = request.params.position;
	console.log(Date() + ' - DELETE /swimmers - Recurso Específico' + aux);
	var filtro = nadadores.filter(n => n.position != aux);
	nadadores = filtro;
	response.sendStatus(200);

});

app.put(baseURL + '/swim-stats/:position', (request, response) => {
	var aux = request.params.position;
	var name = request.body.position;
	if(aux != name){
		response.sendStatus(409);
		console.warn(Date()+ " Hacking Attempt !!!! ");
	}	
	else{
		console.log(Date() + ' - PUT /position - Recurso Específico ' + aux);
		var filtro = nadadores.filter(n => n.position != aux);
		nadadores = filtro;
		nadadores.push(request.body);
		response.sendStatus(200);
	}
});

//Cargar datos iniciales - Baloncesto - loadInitialData.
app.get(baseURL+"/og-basket-stats/loadInitialData", (req,res) => {
	baloncesto = baloncestoInitialData;
	res.send(200);
	console.log("Data sent: "+JSON.stringify(baloncesto,null,2));
})



//RECURSOS GENERALES - API REST - BALONCESTO

app.get(baseURL + '/og-basket-stats', (request, response) => {
	console.log(Date() + ' - GET /og-basket-stats');
	response.send(baloncesto);
});

app.post(baseURL + '/og-basket-stats', (request, response) => {
	console.log(Date() + ' - POST /og-basket-stats');
	var aux = request.body;
	if((aux.year == null)|| (aux.year == "") || (aux == "") ){
		response.send(400, "Bad Request");
	}else{
		baloncesto.push(aux);
		response.send(201, "Created");
	}
});

app.put(baseURL + '/og-basket-stats', (request, response) => {
	console.log(Date() + ' - PUT /og-basket-stats');
	response.send(405, "Method Not Allowed(Put Base Rute)");
});

app.delete(baseURL + '/og-basket-stats', (request, response) => {
	console.log(Date() + ' - DELETE /og-basket-stats');
	baloncesto = []; 
	response.sendStatus(200, "OK");
});

// RECURSOS ESPECÍFICOS - BALONCESTO

app.get(baseURL + '/og-basket-stats/:year', (request, response) => {
	var aux = request.params.year;
	console.log(Date() + ' - GET /year - Recurso Específico' + aux);
	var filtro = baloncesto.filter(n => n.year == aux);
	if(filtro == ""){
		response.sendStatus(400,"Bad Requestt");
	}else{
		response.send(filtro[0]);
	}	
});

app.post(baseURL + '/og-basket-stats/:year', (request, response) => {
	var aux = request.params.year;
	console.log(Date() + ' - POST /year - Recurso Específico ' + aux);
	response.send(405, "Method Not Allowed (Post resource)");
	//response.send(405);
});

app.delete(baseURL + '/og-basket-stats/:year', (request, response) => {
	var aux = request.params.year;
	console.log(Date() + ' - DELETE /basket - Recurso Específico' + aux);
	var filtro = baloncesto.filter(n => n.year != aux);
	baloncesto = filtro;
	response.sendStatus(200,"OK");

});

app.put(baseURL + '/og-basket-stats/:year', (request, response) => {
	var aux = request.params.year;
	var aux2 = request.body;
	if(aux != aux2.year){
		response.send(409,"Conflict (WARNING)");
	}	
	else{
		console.log(Date() + ' - PUT /year - Recurso Específico ' + aux);
		var filtro = baloncesto.filter(n => n.year != aux); 
		banloncesto = filtro; 
		baloncesto.push(request.body);
		response.send(200,"OK");
	}
	
});



