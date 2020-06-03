const express = require('express');
const port = process.env.PORT || 3000; //Anyadido para Heroku L05.
const bodyParser = require('body-parser');
const cors = require("cors");
const request = require("request");

const app = express(); //Por convenio se crea así la variable.

app.use(cors());

//Para las integraciones que se han hecho en las APIs de Fórmula 1
//Proxy para Juanjo - Fallecimientos por sobredosis
var remote12 = "https://sos1920-12.herokuapp.com";
var path12 = "/api/v2/overdose-deaths";

//API externa de las aceitunas
var remoteAceituna = "https://apijosprimen.herokuapp.com";
var pathAceituna = "/josprimenapi/v1/olive";

//API externa de Digimon
var remoteDigimon = "https://digimon-api.herokuapp.com";
var pathDigimon = "/api/digimon";

//===INTEGRACIONESBALONCESTO===\\
//===INTEGRACIONESBALONCESTO===\\
//===INTEGRACIONESBALONCESTO===\\
//API Proxy Juan grupo 28
var remote28 = "https://sos1920-28.herokuapp.com"
var path28 = "/api/v1/ppas";
//API Proxy Grupo 30
var remote04 = "https://sos1920-04.herokuapp.com"
var path04 = "/api/v1/traffic_accidents";
//Proxy para API21 traffic-injuries
var remote21 = "https://sos1920-21.herokuapp.com";
var path21 = "/api/v2/traffic-injuries";

var remote10 = "https://sos1920-10.herokuapp.com";
var path10 = "/api/v2/global-suicides";

//Proxy API externa
//===INTEGRACIONESBALONCESTO===\\
//===INTEGRACIONESBALONCESTO===\\
//===INTEGRACIONESBALONCESTO===\\


const formula1API = require("./src/back/formula1API");
const swimstatsAPI = require("./src/back/swimstatsAPI");
const basketAPI = require("./src/back/basketAPI");

app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/public/"));



//------- Llamada a API Fórmula 1 - Jesús Jiménez Montero -----
formula1API(app);
/*------- Llamada a API Natación - Juan Antonio Aranda Triana -----*/
swimstatsAPI(app);
//=======LLamada a API Baloncesto - Casto Rodríguez Díaz=======\\
basketAPI(app);



//Habilitar cabeceras de la API de Fórmula 1 - PRUEBAS
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//Proxy para la API Externa de Digimon
app.use(pathDigimon, function(req, res) {
  var url = remoteDigimon + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Para la API de Juanjo - GRUPO 12 - Fallecimientos por sobredosis.
app.use(path12, function(req, res) {
  var url = remote12 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Proxy para la API Externa de aceitunas
app.use(pathAceituna, function(req, res) {
  var url = remoteAceituna + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//===INTEGRACIONESBALONCESTO===\\
//===INTEGRACIONESBALONCESTO===\\
//===INTEGRACIONESBALONCESTO===\\

//Proxy para API21 traffic-injuries
app.use(path21, function(req, res) {
  var url = remote21 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

app.use(path10, function(req, res) {
  var url = remote10 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//===INTEGRACIONESBALONCESTO===\\
//===INTEGRACIONESBALONCESTO===\\
//===INTEGRACIONESBALONCESTO===\\
//Proxy Natación Grupo 28 PPA
app.use(path28, function(req, res) {
  var url = remote28 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});
//Proxy Natación Grupo 30 consumo de azúcar
app.use(path04, function(req, res) {
  var url = remote04 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});
//Primer entregable - Devuelve la hora actual del servidor.
app.get("/time", (req, res) => {
	console.log("Peticion enviada al servidor");
	res.send("<html>" + Date() + "</html>");

});

app.listen(port, () => {
	console.log("Server ready in port " + port);
});

console.log("Starting server...");

