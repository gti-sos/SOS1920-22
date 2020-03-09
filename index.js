var express = require('express');

var app = express(); //Por convenio se crea así la variable.

app.use("/", express.static(__dirname+"/public/"));

app.get("/time", (req, res) => {
	console.log("Peticion enviada al servidor");
	res.send("<html>"+Date()+"</html>");
	
} );

app.listen(3000);

console.log("Server ready fake");

