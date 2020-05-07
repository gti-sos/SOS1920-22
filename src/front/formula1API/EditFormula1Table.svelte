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

    export let params = {};
    let formula1 = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedTotalPointNumber = 0;
    let updatedPilotNumber = 0;
    let updatedVictoryNumber = 0;

    //Mensajes de error o éxito
    let okMsg = false;
    let errorMsg = false;

    onMount(getFormula1);

    async function getFormula1() {
        console.log("Fetching formula-stats...");
        const res = await fetch("/api/v1/formula-stats/" + params.country + "/" + params.year);
        if (res.ok) {
            console.log("Ok");
            const json = await res.json();
            formula1 = json;
            updatedCountry = formula1.country;
            updatedYear = formula1.year;
            updatedTotalPointNumber = formula1["totalpointnumber"];
            updatedPilotNumber = formula1["pilotnumber"];
            updatedVictoryNumber = formula1["victorynumber"];

            console.log("Received nationality");
        } else {
            console.log("ERROR");
        }
    }

    async function updateFormula1() {
        console.log("Updating formula-stats");
        if(isNaN(updatedTotalPointNumber) || isNaN(updatedPilotNumber) || isNaN(updatedVictoryNumber)){
                okMsg = false;
                errorMsg = "No pueden introducirse campos no numéricos o campos vacíos";
        } else {
            const res = await fetch("/api/v1/formula-stats/" + params.country + "/" + params.year, {
                method: "PUT",
                body: JSON.stringify({
                    country: params.country,
                    year: parseInt(params.year),
                    "totalpointnumber": updatedTotalPointNumber,
                    "pilotnumber": updatedPilotNumber,
                    "victorynumber": updatedVictoryNumber
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (res) {
                if(isNaN(updatedTotalPointNumber) || isNaN(updatedPilotNumber) || isNaN(updatedVictoryNumber)){
                    okMsg = false;
                    errorMsg = "No pueden introducirse campos no numéricos o campos vacíos";
                }
                getFormula1();
                okMsg = "Se han actualizado los datos de forma exitosa";
                errorMsg = false;
            });
        }
    }
</script>

<main>
    <h2  style="text-align: center;"><small> Editar datos de la API de Fórmula 1 </small></h2>
    <h2  style="text-align: center; margin-bottom: 2%;"><small><strong>{params.country}</strong> - <strong>{params.year}</strong></small></h2>

    {#await formula1}
        Loading formula1 stats...
    {:then formula1}
        <Table bordered>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Número de puntos</th>
                    <th>Número de pilotos</th>
                    <th>Número de victorias</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <!-- Hay que mirar esto con más detenimiento porque da un fallo bastante raro.-->
                    <td> {updatedCountry} </td>
                    <td> {updatedYear} </td>
                    <td> <Input type="number" placeholder="0" step="1" min="0" bind:value="{updatedTotalPointNumber}"/> </td>
                    <td> <Input type="number" placeholder="0" step="1" min="0" bind:value="{updatedPilotNumber}"/> </td>
                    <td> <Input type="number" placeholder="0" step="1" min="0" bind:value="{updatedVictoryNumber}"/> </td>
                    <td> <Button outline color="primary" on:click={updateFormula1}> <i class="fas fa-pencil-alt"></i> Actualizar </Button> </td>
                </tr>
            </tbody>
        </Table>
    {/await}
    {#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
	{/if}
	{#if okMsg}
		<p style="color: green">ÉXITO: {okMsg}</p>
	{/if}

    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</main>