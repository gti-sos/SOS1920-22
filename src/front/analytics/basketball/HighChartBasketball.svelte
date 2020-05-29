<script>

    async function loadGraph() {
        const resData = await fetch("/api/v1/og-basket-stats");
        let dataBasket = await resData.json();
        console.log("Base de datos:" + dataBasket);

        let allData = dataBasket.map((d) => {
            let res = {
                name: d.country,
                y: d.points,
                z: d.year
            };
            return res;
        });


        Highcharts.chart('container', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: 'Puntos Totales Baloncesto'
            },
            subtitle: {
                text: 'Grafica 3D baloncesto'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },

            tooltip: {
                headerFormat: '',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                    'Puntos: <b>{point.y}</b><br/>' +
                    'Año: <b>{point.z}</b><br/>'
            },


            series: [{
                name: 'Puntos Totales',
                data: allData
            }]
        });
    }
    loadGraph();

</script>
<main>
    <div id='container'></div>
</main>