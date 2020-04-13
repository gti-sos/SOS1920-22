module.exports = function(app,dbbasket,baloncestoInitialData){
	
		//Cargar datos iniciales - Baloncesto - loadInitialData.

	var baseURL = "/api/v1";

	app.get(baseURL+"/og-basket-stats/loadInitialData", (req,res) =>{

		dbbasket.insert(baloncestoInitialData);
		res.sendStatus(200);
	});

	/*
	app.get(baseURL+"/og-basket-stats/loadInitialData", (req,res) => {
		baloncesto = baloncestoInitialData.slice();
		res.send(200);
		console.log("Data sent: "+JSON.stringify(baloncesto,null,2));
	})
	*/


	//RECURSOS GENERALES - API REST - BALONCESTO
	app.get(baseURL + '/og-basket-stats', (request, response) => {

		dbbasket.find({},(err, basketstats)=>{

			basketstats.forEach((b)=>{delete b._id;//Borramos el parametro _id
			});
			response.send(JSON.stringify(basketstats,null,2));
		});

	});
	/*
	app.get(baseURL + '/og-basket-stats', (request, response) => {
		console.log(Date() + ' - GET /og-basket-stats');
		response.send(baloncesto);
	});
	*/

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
	
};