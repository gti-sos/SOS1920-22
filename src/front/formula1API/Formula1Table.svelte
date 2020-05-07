<script>

    import{
        onMount
    }
    from "svelte";

    import{
        pop
    }
    from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    //Estos paquetes son perfectos para el HTML y el estilo.
    import Input from "sveltestrap/src/Input.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";

    //Como los paquetes indican, esto sirve para la paginación del frontend.
    import {Pagination, PaginationItem, PaginationLink} from 'sveltestrap';

    let formula1 = [];
    let newFormula1 = {
        "country": "",
        "year": "",
        "totalpointnumber": 0,
        "pilotnumber": 0,
        "victorynumber": 0
    };

    //Estas variables me van a hacer falta para la parte del main.
    let countries = [];
    let years = [];

    //Variables auxiliares con el valor por defecto en las barras de búsqueda del frontend.
    let actualCountry = "";
    let actualYear = "";
   
    //Esto es para la paginación y búsqueda.
    let elementPage = 10;
    let offset = 0;
    let actualPage = 1;
    let moreData = true;

    //Variables para mandar mensajes en la interfaz de usuario
    let okMsg = false;
    let errorMsg = false;

    onMount(getFormula1YearCountry);
    //onMount(getFormula1Country);
    onMount(getFormula1);

    async function getFormula1YearCountry(){
        const res = await fetch("/api/v1/formula-stats");
        
        if(res.ok){
            const json = await res.json();

            countries = json.map((c) => {
                return c.country;
            });

            countries = Array.from(new Set(countries));

            years = json.map((c) => {
                return c.year;
            });

            years = Array.from(new Set(years));

            console.log("Hay "+ countries.length + " países y " +years.length + " años. ");
        }
        else{
            console.log("ERROR");
        }
    }

    async function getFormula1(){
        console.log("Fetching formula-stats...");
        const res = await fetch("/api/v1/formula-stats?offset=" + elementPage * offset + "&limit=" + elementPage);
        const nextPage = await fetch("/api/v1/formula-stats?offset=" + elementPage * (offset + 1 ) + "&limit=" + elementPage);

        if (res.ok && nextPage.ok){
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            formula1 = json;

            if(jsonNext.length == 0){
                moreData = false;
            }
            else{
                moreData = true;
            }
            console.log("Hemos recibido "+formula1.length + " nacionalidades de fórmula 1");
        }
        else{
            console.log("ERROR");
        }
    }

    async function insertFormula1(){
        console.log("Insertando formula-stats..." + JSON.stringify(newFormula1));

        if(isNaN(newFormula1.year) || isNaN(newFormula1.totalpointnumber) || isNaN(newFormula1.pilotnumber) || isNaN(newFormula1.victorynumber) || newFormula1.country==="" || newFormula1.year===""){
             console.log("Uno o más datos NO son numéricos");
             okMsg = false;
             errorMsg = "No puede introducir campos en blanco o campos que no sean numéricos";
        }
        else{
            const res = await fetch("/api/v1/formula-stats", {
                method: "POST",
                body: JSON.stringify(newFormula1),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(res) {
                if(res.ok){
                    getFormula1();
                    okMsg = "Dato introducido de forma exitosa";
                    errorMsg = false;
                }
                else{
                    okMsg = false;
                    errorMsg = "No puede introducirse un dato con mismo año y país debido a que ya existe uno en la base de datos";
                }
            });
            //console.log(newFormula1);
            
        }
    }

    async function deleteFormula1(country, year){
        console.log("Borrando un objeto fórmula 1 concreto");
        const res = await fetch("/api/v1/formula-stats/" + country + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            getFormula1();
            getFormula1YearCountry();
        });
        okMsg = "Dato borrado de forma exitosa";
        errorMsg = false;

    }

    //MUCHO OJO. No podemos poner nombres iguales a funciones a pesar de recibir parámetros de entrada distintos.
    async function deleteFormula1Data(){
        console.log("Borrando un objeto fórmula 1 concreto");
        const res = await fetch("/api/v1/formula-stats", {
            method: "DELETE"
        }).then(function (res) {
            getFormula1();
            getFormula1YearCountry();
        });
        okMsg = "Todos los datos han sido borrados de forma exitosa";
        errorMsg = false;
    }

    async function loadInitialDataFormula1() {
		console.log("Cargando datos iniciales de la API Fórmula 1...");
        const res = await fetch("/api/v1/formula-stats/loadInitialData")
            .then(function (res) {
			    getFormula1();
		});
        okMsg = "Los datos iniciales han sido cargados de forma exitosa";
        errorMsg = false;
	};

    //Método de búsqueda. Los 'if' los estamos poniendo para comprobar si queremos buscar por país, anyo o ambos.
    async function searchFormula1(country, year) {
		console.log("Realizando búsqueda del país: " + country + " y del año: " + year);
        
        //year=parseInt(year);
        
        var url = "/api/v1/formula-stats";
        
		if (country != "" && year != "") {
            url = url + "?country=" + country + "&year=" + year;
            console.log(url);
        } 
        else if (country != "" && year == "") {
            url = url + "?country=" + country;
            console.log(url);
        } 
        else if (country == "" && year != "") {
            url = url + "?year=" + year;
            console.log(url);
        }
        
        const res = await fetch(url);
        
		if (res.ok) {
			console.log("OK");
			const json = await res.json();
			formula1 = json;			
			console.log("Encontradas " + formula1.length + " nacionalidades de pilotos de Fórmula 1.");
            
            if(formula1.length > 0){
                okMsg = "Se ha encontrado uno o varios resultados";
                errorMsg = false;
            }
            else{
                okMsg = false;
                errorMsg = "No se ha obtenido ningún resultado";
            }
        } 
        else {
			console.log("ERROR");
		}
		
	}

    async function addOffSet(inc){
        offset += inc;
        actualPage += inc;
        getFormula1();
    }
    
</script>

<main>

    {#await formula1}
        Loading formula1 stats...
    {:then formula1}
    <style>
        button{
            font-size: 16px;
            border-radius: 4px;
            background-color: white;
        }
    </style>

        <Button outline color="secondary" style="font-size: 16px;border-radius: 4px;background-color: white;" on:click="{searchFormula1(actualCountry, actualYear)}" class="button-search"> Buscar </Button>
    
        <FormGroup> 
			<Label for="selectCountry"> Búsqueda por país </Label>
			<Input name="selectCountry" id="selectCountry" bind:value="{actualCountry}">
				{#each countries as country}
				<option>{country}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>
				
		<FormGroup>
			<Label for="selectYear"> Búsqueda por año </Label>
			<Input name="selectYear" id="selectYear" bind:value="{actualYear}">
				{#each years as year}
				<option>{year}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>

        <Table bordered >
            <thead style="background:black;color:white;text-align:center;">
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Número de puntos</th>
                    <th>Número de pilotos</th>
                    <th>Número de victorias</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody style="background:white;color:black;text-align:center;">
                <tr>
                    <td> <Input type="text" placeholder="Introduzca un país" bind:value="{newFormula1.country}"/></td>
					<td> <Input type="number" placeholder="Introduzca un año" bind:value="{newFormula1.year}"/></td>
					<td> <Input type="number" placeholder="Sólo caracteres numéricos" step="1" min="0" bind:value="{newFormula1.totalpointnumber}"/> </td>
					<td> <Input type="number" placeholder="Sólo caracteres numéricos" step="1" min="0" bind:value="{newFormula1.pilotnumber}"/></td>
					<td> <Input type="number" placeholder="Sólo caracteres numéricos" step="1" min="0" bind:value="{newFormula1.victorynumber}"/></td>
					<td> <Button outline color="primary" on:click={insertFormula1}> Insertar </Button> </td>
                </tr>
                {#each formula1 as piloto}
                <tr>
                    <td>
                        <a href="#/formula-stats/{piloto.country}/{piloto.year}">		
							{piloto.country}
						</a>
                    </td>
                    <td> {piloto.year} </td>
					<td> {piloto.totalpointnumber} </td>
					<td> {piloto.pilotnumber} </td>
					<td> {piloto.victorynumber} </td>
					<td> <Button outline style="font-size: 16px;border-radius: 4px;background-color: white;padding: 10px 24px;" color="danger" on:click="{deleteFormula1(piloto.country, piloto.year)}"> Borrar </Button> </td>
                </tr>
                {/each}
            </tbody>
        </Table>
    {/await}

    <Pagination style="float:right;" ariaLabel="Cambio de página">


		<PaginationItem class="{actualPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/formula1API" on:click="{() => addOffSet(-1)}" />
		</PaginationItem>
		
		{#if actualPage != 1}
		<PaginationItem>
			<PaginationLink href="#/formula1API" on:click="{() => addOffSet(-1)}" >{actualPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/formula1API" >{actualPage}</PaginationLink>
		</PaginationItem>

		{#if moreData}
		<PaginationItem >
			<PaginationLink href="#/formula1API" on:click="{() => addOffSet(1)}">{actualPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}

		<PaginationItem class="{moreData ? '' : 'disabled'}">
		  <PaginationLink next href="#/formula1API" on:click="{() => addOffSet(1)}"/>
		</PaginationItem>

    </Pagination>
    {#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
	{/if}
	{#if okMsg}
		<p style="color: green">ÉXITO: {okMsg}</p>
	{/if}

    <Button outline style="font-size: 16px;border-radius: 4px;background-color: white;" color="secondary" on:click="{pop}"> Atrás </Button>
    <Button outline style="font-size: 16px;border-radius: 4px;background-color: white;" color="primary" on:click="{loadInitialDataFormula1}">Cargar datos iniciales</Button>
	<Button outline style="font-size: 16px;border-radius: 4px;background-color: white;" on:click={deleteFormula1Data} color="danger"> Borrar todo </Button>
</main>