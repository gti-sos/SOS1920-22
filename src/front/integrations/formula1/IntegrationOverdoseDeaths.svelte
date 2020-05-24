<script>
    import { 
        onMount 
    } from "svelte";


    onMount(loadGraph);


    async function loadGraph(){
        const res = await fetch("/proxyOverdoseDeaths");
        const data = await resData.json();  
    }

</script>


<main>
    Probando integración de la API de Fallecimientos por sobredosis
</main> 