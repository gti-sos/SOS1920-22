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
    import Input from "sveltestrap/src/Input.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";

    import {Pagination, PaginationItem, PaginationLink} from 'sveltestrap';

    let swimmers = [];
    let newSwimmers = {
        "country": "",
        "year": "",
        "yearofbirth": 0,
        "position": 0,
        "time": 0.0
    };

    //Variables para los SELECT (No estoy seguro de si es necesario)
    let position = [];

    let actualPosition = "";
   
    //Esto es para la paginación y búsqueda.
    let elementPage = 10;
    let offset = 0;
    let actualPage = 1;
    let moreData = true;

    //Variables para mandar mensajes en la interfaz de usuario
    let okMsg = false;
    let errorMsg = false;

    onMount(getSwimPosition);
    onMount(getSwimmers);

    async function getSwimPosition(){
        const res = await fetch("/api/v1/swim-stats");
        if(res.ok){
            const json = await res.json();

            position = json.map((c) => {
                return c.position;
            });

            position = Array.from(new Set(position));


            console.log("Hay "+ position.length + " nadadores registrados.");
        }
        else{
            console.log("ERROR");
        }
    }

    async function getSwimmers(){
        console.log("Fetching swim-stats...");
        const res = await fetch("/api/v1/swim-stats?offset=" + elementPage * offset + "&limit=" + elementPage);
        const nextPage = await fetch("/api/v1/swim-stats?offset=" + elementPage * (offset + 1 ) + "&limit=" + elementPage);

        if (res.ok && nextPage.ok){
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            swimmers = json;

            if(jsonNext.length == 0){
                moreData = false;
            }
            else{
                moreData = true;
            }
            console.log("Hemos recibido "+swimmers.length + " posiciones del ranking de nadadores.");
            okMsg="Mostrando todos los datos";
            errorMsg=false;
        }
        else{
            console.log("ERROR");
        }
    }

    async function insertSwimmers(){
        console.log("Insertando swim-stats..." + JSON.stringify(newSwimmers));

        if(isNaN(newSwimmers.year) || isNaN(newSwimmers.yearofbirth) || isNaN(newSwimmers.position) || isNaN(newSwimmers.time) || newSwimmers.country==="" || newSwimmers.year===""){
             console.log("Uno o más datos NO son numéricos");
             okMsg = false;
             errorMsg = "No puede introducir campos en blanco o campos que no sean numéricos";
        }
        else{
            const res = await fetch("/api/v1/swim-stats", {
                method: "POST",
                body: JSON.stringify(newSwimmers),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(res) {
                if(res.ok){
                    getSwimmers();
                    okMsg = "Dato introducido de forma exitosa";
                    errorMsg = false;
                }
                else{
                    okMsg = false;
                    errorMsg = "No puede introducirse un dato con una posición que ya existe";
                }
            });

        }
    }


    async function deleteSwimmer(position){
        console.log("Borrando un objeto swimmer concreto");
        const res = await fetch("/api/v1/swim-stats/" + position, {
            method: "DELETE"
        }).then(function (res) {
            getSwimmers();
            getSwimPosition();
        });
        okMsg = "Dato borrado de forma exitosa";
        errorMsg = false;

    }

    //MUCHO OJO. No podemos poner nombres iguales a funciones a pesar de recibir parámetros de entrada distintos.
    async function deleteSwimmersData(){
        console.log("Borrando todos los objetos swimmer");
        const res = await fetch("/api/v1/swim-stats", {
            method: "DELETE"
        }).then(function (res) {
            getSwimmers();
            getSwimPosition();
        });
        okMsg = "Todos los datos han sido borrados de forma exitosa";
        errorMsg = false;
    }

    async function loadInitialDataSwimmers() {
		console.log("Cargando datos iniciales de la API de nadadores...");
        const res = await fetch("/api/v1/swim-stats/loadInitialData")
            .then(function (res) {
			    getSwimmers();
		});
        okMsg = "Los datos iniciales han sido cargados de forma exitosa";
        errorMsg = false;
	};
    //Método de búsqueda.
    async function search(position){
        console.log("Buscando datos: " + position);
        var url = "/api/v1/swim-stats?position=" + position;
        if(position===""){
            url = "/api/v1/swim-stats"
        }
        const res = await fetch(url);
        console.log(res);

        if (res.ok){
            console.log("Ok");
            const json = await res.json();
            swimmers = json;
            if (swimmers.length === 1) {
                console.log("El nadador con la posición " + swimmers.position + " es de: " + swimmers.country);
                okMsg = "Se ha encontrado la posición deseada";
                errorMsg = false;
            }
            else {
                if(url==="/api/v1/swim-stats"){
                    okMsg="Aquí tiene todos los datos"
                    errorMsg=false;
                } else {
                    okMsg = false;
                    errorMsg = "Fallo, no existe un nadador con esa posición"
                }
            }
        }
        else{
            console.log("ERROR");
        }
    }

    async function addOffSet(inc){
        offset += inc;
        actualPage += inc;
        getSwimmers();
    }
    
</script>
<main>

    {#await swimmers}
        Loading swimmers stats...
    {:then swimmers}
    <style>
        button{
            font-size: 16px;
            border-radius: 4px;
            background-color: white;
        }
    </style>
        <Button style="font-size: 16px;border-radius: 4px;background-color: white;"outline color="secondary" on:click="{search(actualPosition)}" class="button-search"> Buscar </Button>
    
        <FormGroup>
            <Label for="inputPosition"> Búsqueda por posición </Label>
            <Input type="number" name="inputPosition" id="inputPosition" bind:value="{actualPosition}">
            </Input>
        </FormGroup>

        <Table bordered>
            <thead style="background:black;color:white;text-align:center;">
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Año de nacimiento</th>
                    <th>Posición</th>
                    <th>Tiempo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody style="background:white;color:black;text-align:center;">
                <tr>
                    <td> <Input type="text" placeholder="Introduzca un país" bind:value="{newSwimmers.country}"/></td>
					<td> <Input type="number" placeholder="Introduzca el año" bind:value="{newSwimmers.year}"/></td>
					<td> <Input type="number" placeholder="Introduzca el año de nacimiento" step="1" min="1900" bind:value="{newSwimmers.yearofbirth}"/> </td>
					<td> <Input type="number" placeholder="Introduzca la posición global" step="1" bind:value="{newSwimmers.position}"/></td>
					<td> <Input type="number" placeholder="Introduzca el tiempo realizado" step="1" bind:value="{newSwimmers.time}"/></td>
					<td> <Button style="font-size: 16px;border-radius: 4px;background-color: white;padding: 10px 24px;"outline color="primary" on:click={insertSwimmers}> Insertar </Button> </td>
                </tr>
                {#each swimmers as nadador}
                <tr>
                    <td> {nadador.country} </td>
					<td> {nadador.year} </td>
					<td> {nadador.yearofbirth} </td>
                    <td>
                        <a href="#/swim-stats/{nadador.position}">		
							{nadador.position}
						</a>
                    </td>
					<td> {nadador.time} </td>
					<td> <Button style="font-size: 16px;border-radius: 4px;background-color: white;padding: 10px 24px;" outline color="danger" on:click="{deleteSwimmer(nadador.position)}"> Borrar </Button> </td>
                </tr>
                {/each}
            </tbody>
        </Table>
    {/await}

    <Pagination style="float:right;" ariaLabel="Cambiar de página">


		<PaginationItem class="{actualPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/swimstatsAPI" on:click="{() => addOffSet(-1)}" />
		</PaginationItem>
		
		{#if actualPage != 1}
		<PaginationItem>
			<PaginationLink href="#/swimstatsAPI" on:click="{() => addOffSet(-1)}" >{actualPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/swimstatsAPI" >{actualPage}</PaginationLink>
		</PaginationItem>

		{#if moreData}
		<PaginationItem >
			<PaginationLink href="#/swimstatsAPI" on:click="{() => addOffSet(1)}">{actualPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}

		<PaginationItem class="{moreData ? '' : 'disabled'}">
		  <PaginationLink next href="#/swimstatsAPI" on:click="{() => addOffSet(1)}"/>
		</PaginationItem>

    </Pagination>
    {#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
	{/if}
	{#if okMsg}
		<p style="color: green">ÉXITO: {okMsg}</p>
    {/if}
    <Button outline style="font-size: 16px;border-radius: 4px;background-color: white;"color="secondary" on:click="{pop}"> Atrás </Button>
    <Button outline style="font-size: 16px;border-radius: 4px;background-color: white;"color="primary" on:click="{loadInitialDataSwimmers}">Cargar datos iniciales</Button>
    <Button outline style="font-size: 16px;border-radius: 4px;background-color: white;"color="success" on:click="{getSwimmers}">Ver los nadadores actuales</Button>
	<Button outline style="font-size: 16px;border-radius: 4px;background-color: white;"on:click={deleteSwimmersData} color="danger"> Borrar todo </Button>
</main>