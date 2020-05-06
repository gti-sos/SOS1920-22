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

    let basket = [];
    let newBasket = {
        "country": "",
        "year": "",
        "points": 0,
        "threepoints": 0,
        "rebounds": 0
    };

    //===========IDENTIFICADORES===========\\
    let countries = [];
    let years = [];
    //===========CamposVaciosParaLaBusqueda===========\\
    let actualCountry = "";
    let actualYear = "";
    //===========Paginacion===========\\
    let elementPage = 10;
    let offset = 0;
    let actualPage = 1;
    let moreData = true;
    //===========MensajesDesactivados===========\\
    let okMsg = false;
    let errorMsg = false;
    onMount(getBasketCountryYear);
    onMount(getBasket);


//=======================GET=======================\\

    async function getBasketCountryYear(){
        const res = await fetch("/api/v1/og-basket-stats");
        
        if(res.ok){
            //===========PAIS===========\\
            const json = await res.json();
            countries = json.map((c) => {
                return c.country;
            });

            countries = Array.from(new Set(countries));
          
            //===========ANYOS===========\\
            years = json.map((c) => {
                return c.year;
            });

            years = Array.from(new Set(years));

        }else{
            console.log("ERROR");
        }
    }


    async function getBasket(){
        console.log("Fetching og-basket-stats...");
        const res = await fetch("/api/v1/og-basket-stats?offset=" + elementPage * offset + "&limit=" + elementPage);
        const nextPage = await fetch("/api/v1/og-basket-stats?offset=" + elementPage * (offset + 1 ) + "&limit=" + elementPage);

        if (res.ok && nextPage.ok){
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            basket = json;

            if(jsonNext.length == 0){
                moreData = false;
            }else{
                moreData = true;
            }
        }else{
            console.log("ERROR");
        }
    }


//=======================POST=======================\\

    async function insertBasket(){
        console.log("Insertando og-basket-stats..." + JSON.stringify(newBasket));

        if(isNaN(newBasket.year) || isNaN(newBasket.points) || isNaN(newBasket.threepoints) || isNaN(newBasket.rebounds)){
             console.log("Uno o más datos NO son numéricos");
             okMsg = false;
             errorMsg = "No puede introducir campos en blanco o campos que no sean numéricos";
        }else{
            const res = await fetch("/api/v1/og-basket-stats", {
                method: "POST",
                body: JSON.stringify(newBasket),
                headers: {
                    "Content-Type": "application/json"
                }
            
            }).then(function(res) {
                
                if(res.ok){ 
                    getBasket();
                    okMsg = "Dato introducido de forma exitosa";
                    errorMsg = false;
                }else{                
                    okMsg = false;
                    errorMsg = "No puede introducirse un dato con mismo año y país debido a que ya existe uno en la base de datos";
                }
            });
           
            
        }
    }
//=======================DELETE=======================\\

    async function deleteBasket(country, year){
        const res = await fetch("/api/v1/og-basket-stats/" + year + "/" + country, {
            method: "DELETE"
        }).then(function (res) {
            getBasket();
            getBasketCountryYear();
        });
        okMsg = "Dato borrado de forma exitosa";
        errorMsg = false;

    }

    async function deleteBasketData(){
        const res = await fetch("/api/v1/og-basket-stats", {
            method: "DELETE"
        }).then(function (res) {
            getBasket();
            getBasketCountryYear();
        });
        okMsg = "Todos los datos han sido borrados de forma exitosa";
        errorMsg = false;
    }


//=======================LOADINITIALDATA=======================\\

    async function loadInitialDataBasket() {

        const res = await fetch("/api/v1/og-basket-stats/loadInitialData")
            .then(function (res) {
			    getBasket();
		});
        okMsg = "Los datos iniciales han sido cargados de forma exitosa";
        errorMsg = false;
	};

//=======================BUSQUEDA=======================\\

    async function searchBasket(country, year) {
		        
        var url = "/api/v1/og-basket-stats";
        
		if (country != "" && year != "") {
            url = url + "?year=" + year + "&country=" + country;
        }else if (country != "" && year == "") {
            url = url + "?country=" + country;
        }else if (country == "" && year != "") {
            url = url + "?year=" + year;
        }
        
        const res = await fetch(url);
        
		if (res.ok) {
            
			const json = await res.json();
			basket = json;			
			
            if(basket.length > 0){
                okMsg = "Se ha encontrado uno o varios resultados";
                errorMsg = false;
            }else{
                okMsg = false;
                errorMsg = "No se ha obtenido ningún resultado";
            }

        }else{
			console.log("ERROR");
		}
		
	}

    async function addOffSet(inc){
        offset += inc;
        actualPage += inc;
        getBasket();
    }

//=======================FIN=======================\\
//=======================FIN=======================\\
//=======================FIN=======================\\
//=======================FIN=======================\\
</script>



<main>

    {#await basket}
        Loading basket stats...
    {:then basket}

        <Button outline color="secondary" on:click="{searchBasket(actualCountry, actualYear)}" class="button-search"> Buscar </Button>
    
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

        <Table bordered>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Puntos Totales</th>
                    <th>Tiros de Tres</th>
                    <th>Rebotes</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> <Input type="text" placeholder="Introduzca un país" bind:value="{newBasket.country}"/></td>
					<td> <Input type="number" placeholder="Introduzca un año" bind:value="{newBasket.year}"/></td>
					<td> <Input type="number" placeholder="Sólo caracteres numéricos" step="1" min="0" bind:value="{newBasket.points}"/> </td>
					<td> <Input type="number" placeholder="Sólo caracteres numéricos" step="1" min="0" bind:value="{newBasket.threepoints}"/></td>
					<td> <Input type="number" placeholder="Sólo caracteres numéricos" step="1" min="0" bind:value="{newBasket.rebounds}"/></td>
					<td> <Button outline color="primary" on:click={insertBasket}> Insertar </Button> </td>
                </tr>
                {#each basket as equipo}
                <tr>
                    <td>
                        <a href="#/og-basket-stats/{equipo.country}/{equipo.year}">		
							{equipo.country}
						</a>
                    </td>
                    <td> {equipo.year} </td>
					<td> {equipo.points} </td>
					<td> {equipo.threepoints} </td>
					<td> {equipo.rebounds} </td>
					<td> <Button outline color="danger" on:click="{deleteBasket(equipo.country, equipo.year)}"> Borrar </Button> </td>
                </tr>
                {/each}
            </tbody>
        </Table>
    {/await}

    <Pagination style="float:right;" ariaLabel="Cambio de página">


		<PaginationItem class="{actualPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/basketAPI" on:click="{() => addOffSet(-1)}" />
		</PaginationItem>
		
		{#if actualPage != 1}
		<PaginationItem>
			<PaginationLink href="#/basketAPI" on:click="{() => addOffSet(-1)}" >{actualPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/basketAPI" >{actualPage}</PaginationLink>
		</PaginationItem>

		{#if moreData}
		<PaginationItem >
			<PaginationLink href="#/basketAPI" on:click="{() => addOffSet(1)}">{actualPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}

		<PaginationItem class="{moreData ? '' : 'disabled'}">
		  <PaginationLink next href="#/basketAPI" on:click="{() => addOffSet(1)}"/>
		</PaginationItem>

    </Pagination>
    {#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
	{/if}
	{#if okMsg}
		<p style="color: green">ÉXITO: {okMsg}</p>
	{/if}

    <Button outline color="secondary" on:click="{pop}"> Atrás </Button>
    <Button outline color="primary" on:click="{loadInitialDataBasket}">Cargar datos iniciales</Button>
	<Button outline on:click={deleteBasketData} color="danger"> Borrar todo </Button>
</main>