<script>

    async function loadGraph() {
        const resData = await fetch("/api/v1/og-basket-stats");
        let dataBasket = await resData.json();
        console.log("asdfasdfasd" + dataBasket);

        let countryes = dataBasket.map((d) => {return d.countryes});
        console.log("ASDFE" + countryes);
        let points = dataBasket.map((d) => { return d.points; });
        console.log("ewwewe" + points);

        

        Highcharts.chart('container', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: 'Contents of Highsoft\'s weekly fruit delivery'
            },
            subtitle: {
                text: '3D donut in Highcharts'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Delivered amount',
                data: [
                    ['Bananas', 30],
                    ['Kiwi', 3],
                    ['Mixed nuts', 1],
                    ['Oranges', 6],
                    ['Apples', 8],
                    ['Pears', 4],
                    ['Clementines', 4],
                    ['Reddish (bag)', 1],
                    ['Grapes (bunch)', 1]
                ]
            }]
        });


    }

</script>




<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>

</svelte:head>



<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        A variation of a 3D pie chart with an inner radius added.
        These charts are often referred to as donut charts.
    </p>
</figure>