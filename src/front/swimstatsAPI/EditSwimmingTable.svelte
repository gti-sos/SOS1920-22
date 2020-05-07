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
    let swimmers = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedYearOfBirth = 0;
    let updatedPosition = 0;
    let updatedTime = 0.0;

    let okMsg = false;
    let errorMsg = false;
    onMount(getSwimmers);

    async function getSwimmers() {
        console.log("Fetching swim-stats...");
        const res = await fetch("/api/v1/swim-stats/" + params.position);
        if (res.ok) {
            console.log("Ok");
            const json = await res.json();
            swimmers = json;
            updatedPosition = swimmers.position;
            updatedCountry = swimmers["country"];
            updatedYear = swimmers["year"];
            updatedYearOfBirth = swimmers["yearofbirth"];
            updatedTime = swimmers["time"];
            console.log("Received position");
        } else {
            errorMsg = "No se encuentra este nadador con la posición indicada."
            console.log("ERROR");
        }
    }

    async function updateSwimmers() {
        console.log("Updating swim-stats");
        if(isNaN(updatedYear) || isNaN(updatedYearOfBirth) || isNaN(updatedTime)){
                okMsg = false;
                errorMsg = "No pueden introducirse campos no numéricos o campos vacíos";
        } else {
            const res = await fetch("/api/v1/swim-stats/" + params.position, {
                method: "PUT",
                body: JSON.stringify({
                    "country": updatedCountry,
                    "year": updatedYear,
                    "yearofbirth": updatedYearOfBirth,
                    position: parseInt(params.position),
                    "time": updatedTime
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (res) {
                if(isNaN(updatedYear) || isNaN(updatedYearOfBirth) || isNaN(updatedTime)){
                    okMsg = false;
                    errorMsg = "No pueden introducirse campos no numéricos o campos vacíos";
                }
                getSwimmers();
                okMsg = "Se han actualizado los datos de forma exitosa";
                errorMsg = false;
            });
        }
    }
</script>

<main>
    <h2  style="text-align: center;"><small> Editar dato/s de Nadadores </small></h2>
    <h2  style="text-align: center; margin-bottom: 2%;"><small><strong>{params.position}</strong></small></h2>

    {#await swimmers}
        Loading swimmers stats...
    {:then swimmers}
        <Table bordered>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Año de nacimiento</th>
                    <th>Posición</th>
                    <th>Tiempo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> <Input type="text" bind:value="{updatedCountry}"/> </td>
                    <td> <Input type="number" bind:value="{updatedYear}"/> </td>
                    <td> <Input type="number" bind:value="{updatedYearOfBirth}"/> </td>
                    <td> {updatedPosition} </td>
                    <td> <Input type="number" placeholder="0" step="0.01" min="0" bind:value="{updatedTime}"/> </td>
                    <td> <Button outline color="primary" on:click={updateSwimmers}> <i class="fas fa-pencil-alt"></i> Actualizar </Button> </td>
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