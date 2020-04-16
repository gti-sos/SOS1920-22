const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const formula1API = require(path.join(__dirname, "formula1API"));
const swimstatsAPI = require(path.join(__dirname, "swimstatsAPI"));


const port = process.env.PORT || 3000; //Anyadido para Heroku L05.
const app = express(); //Por convenio se crea así la variable.

//Quizás quitar una vez que todo el mundo haya hecho su 
const baseURL = "/api/v1";


app.use(bodyParser.json());
app.use("/", express.static(__dirname+"/public/"));


//------- Llamada a API Fórmula 1 - Jesús Jiménez Montero -----
formula1API(app);
/*------- Llamada a API Natación - Juan Antonio Aranda Triana -----*/
swimstatsAPI(app);
//Primer entregable - Devuelve la hora actual del servidor.
app.get("/time", (req, res) => {
	console.log("Peticion enviada al servidor");
	res.send("<html>"+Date()+"</html>");
	
} );

app.listen(port, () => {
	console.log("Server ready fake");
});

console.log("Starting server...");

// Backlog L03. - 23/03/2020


var baloncestoInitialData = [
	{ country: 'serbia', year:2016, points:66, threepoints: 4, rebounds: 33 },
	{ country: 'spain', year:2012, points:100, threepoints: 7, rebounds: 35 },
	{ country: 'spain', year:2008, points:107, threepoints: 8, rebounds: 37 },
	{ country: 'italy', year:2004, points:69, threepoints: 11, rebounds: 26 },
	{ country: 'france', year:2000, points:75, threepoints: 6, rebounds: 20 },
];

var baloncesto = baloncestoInitialData.slice();

/*var dbformula1 = new nedb({
	filename: DataStore,
	autoload: true
	
});

dbformula1.find({}, (error, formula1) => {
	if(error){
		console.error("Error accessing DataBase");
		process.exit(1);
	}
	if(formula1.length == 0){
		console.log('Empty DataBase - Inserting Default Data');
		dbformula1.insert(pilotosInitialData);
	}
	else{
		console.log(Date() + 'Data loaded');
	}
});

formula1api.methods(app, pilotosInitialData, pilotos, baseURL, dbformula1);*/


//Cargar datos iniciales - Natación - loadInitialData.
/*app.get(baseURL+"/swim-stats/loadInitialData", (req,res) => {
	nadadores = nadadoresInitialData.slice();
	res.send(200, 'Los datos iniciales se han cargado.');
	console.log("Data sent: "+JSON.stringify(nadadores,null,2));
});

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
});*/

//Cargar datos iniciales - Baloncesto - loadInitialData.
app.get(baseURL+"/og-basket-stats/loadInitialData", (req,res) => {
	baloncesto = baloncestoInitialData.slice();
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

//var modulo = require('./formula1API');
//modulo.console();

