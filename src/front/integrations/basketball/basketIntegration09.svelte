<script>

    async function loadGraph() {
        const resData = await fetch("/api/v1/og-basket-stats");
        let dataBasket = await resData.json();
        const resDataApi = await fetch("https://sos1920-09.herokuapp.com/api/v2/oil-coal-nuclear-energy-consumption-stats/");
        let dataApi = await resDataApi.json();

        //===Tratando los datos===\\
        let allDataBasket = dataBasket.map((d) => {
            let res = {
                name: d.country,
                y: d.points,
                z: d.year
            };
            return res;
        });

        //===cambiarDatos===\\
        let allDataApi = dataApi.map((d) => {
            let res = {
                name: d.country,
                y: d["oil-consumption"],
                z: d.year
            };
            return res;
        });
        let allData = allDataBasket.concat(allDataApi);

        console.log(allData);

        //===Grafica===\\
        Highcharts.chart('container4', {

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
                    'Puntos(en caso de baloncesto) o Consumo de Petroleo(en caso de Consumo de energias): <b>{point.y}</b><br/>' +
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
    <div id='container4'></div>
</main>