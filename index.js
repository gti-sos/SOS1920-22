const express = require('express');
const port = process.env.PORT || 3000; //Anyadido para Heroku L05.
const bodyParser = require('body-parser');
const cors = require("cors");
const request = require("request");

const app = express(); //Por convenio se crea así la variable.

app.use(cors());

//Para las integraciones que se han hecho en las APIs de Fórmula 1

var remote12 = "https://sos1920-12.herokuapp.com";
var path12 = "/api/v2/overdose-deaths";

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

//Para la API de Juanjo - GRUPO 12 - Fallecimientos por sobredosis.
app.use(path12, function(req, res) {
  var url = remote12 + req.baseUrl + req.url;
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

