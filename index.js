var express = require('express');

var app = express(); //Por convenio se crea así la variable.

app.use("/", express.static(__dirname+"/public/"));