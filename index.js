const express = require('express');
const port = process.env.PORT || 3000; //Anyadido para Heroku L05.
const bodyParser = require('body-parser');

const app = express(); //Por convenio se crea así la variable.

const formula1API = require("./src/back/formula1API");
const swimstatsAPI = require("./src/back/swimstatsAPI");
const basketAPI = require("./src/back/basketAPI");

app.use(bodyParser.json());
app.use("/", express.static(__dirname+"/public/"));

//------- Llamada a API Fórmula 1 - Jesús Jiménez Montero -----
formula1API(app);
/*------- Llamada a API Natación - Juan Antonio Aranda Triana -----*/
swimstatsAPI(app);
//=======LLamada a API Baloncesto - Casto Rodríguez Díaz=======\\
basketAPI(app);


//Primer entregable - Devuelve la hora actual del servidor.
app.get("/time", (req, res) => {
	console.log("Peticion enviada al servidor");
	res.send("<html>"+Date()+"</html>");
	
} );

app.listen(port, () => {
	console.log("Server ready in port "+port);
});

console.log("Starting server...");

