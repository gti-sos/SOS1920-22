var express = require('express');

var app = express(); //Por convenio se crea así la variable.

var port = process.env.PORT || 3000;

app.use("/", express.static(__dirname+"/public/"));

app.get("/time", (req, res) => {
	console.log("Peticion enviada al servidor");
	res.send("<html>"+Date()+"</html>");
	
} );

app.listen(port, () => {
	console.log("Server ready fake");
});

console.log("Starting server...");

