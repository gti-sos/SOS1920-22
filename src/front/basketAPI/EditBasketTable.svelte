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
    let basket = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedPoints = 0;
    let updatedThreepoints = 0;
    let updatedRebounds = 0;

    let okMsg = false;
    let errorMsg = false;

    onMount(getBasket);

    async function getBasket() {
        const res = await fetch("/api/v1/og-basket-stats/" + params.year + "/" + params.country);
        if (res.ok) {
            const json = await res.json();
            basket = json;
            updatedCountry = basket.country;
            updatedYear = basket.year;
            updatedPoints = basket["points"];
            updatedThreepoints = basket["threepoints"];
            updatedRebounds = basket["rebounds"];
        }else{
            console.log("ERROR");
        }
    }

    async function updateBasket() {
        const res = await fetch("/api/v1/og-basket-stats/" + params.year + "/" + params.country, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year),
                "points": updatedPoints,
                "threepoints": updatedThreepoints,
                "rebounds": updatedRebounds
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if(isNaN(updatedPoints) || isNaN(updatedThreepoints) || isNaN(updatedRebounds)){
                okMsg = false;
                errorMsg = "No pueden introducirse campos no numéricos o campos vacíos";
            }
            getBasket();
            okMsg = "Se han actualizado los datos de forma exitosa";
            errorMsg = false;
        });
    }
</script>

<main>
    <h2  style="text-align: center;"><small> Editar datos de la API de Baloncesto </small></h2>
    <h2  style="text-align: center; margin-bottom: 2%;"><small><strong>{params.country}</strong> - <strong>{params.year}</strong></small></h2>

    {#await basket}
        Loading basket stats...
    {:then basket}
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
                    <!-- Hay que mirar esto con más detenimiento porque da un fallo bastante raro.-->
                    <td> {updatedCountry} </td>
                    <td> {updatedYear} </td>
                    <td> <Input type="number" placeholder="0" step="1" min="0" bind:value="{updatedPoints}"/> </td>
                    <td> <Input type="number" placeholder="0" step="1" min="0" bind:value="{updatedThreepoints}"/> </td>
                    <td> <Input type="number" placeholder="0" step="1" min="0" bind:value="{updatedRebounds}"/> </td>
                    <td> <Button outline color="primary" on:click={updateBasket}> <i class="fas fa-pencil-alt"></i> Actualizar </Button> </td>
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