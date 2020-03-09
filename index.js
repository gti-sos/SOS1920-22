var express = require('express');

var app = express(); //Por convenio se crea así la variable.

app.use("/", express.static(__dirname+"/public/"));

app.listen(3000);

console.log("Server ready fake");

