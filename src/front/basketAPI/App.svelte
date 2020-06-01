<script>
    import BasketTable from './BasketTable.svelte';
</script>

<main>
    <style>
        body {
            background: lightblue
        }
    </style>
    <h1 class="display-4" style="text-align:center;">API de Baloncesto Olimpiadas- SOS1920</h1>
    <div align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Basketball_pictogram.svg"
            alt="LogoBasket" width="400" height="400"></div>
    <div style="margin-bottom: 25px">
        <div>
            <a href="https://sos1920-22.herokuapp.com/#/analytics/highcharts-og-basket-stats" rel="nofollow">Grafica
                HighChart Baloncesto</a>
        </div>
        <div>
            <a href="https://sos1920-22.herokuapp.com/#/analytics/awesome-og-basket-stats" rel="nofollow">Grafica
                Awesome Chart Baloncesto</a>
        </div>
    </div>
    <BasketTable />
</main>