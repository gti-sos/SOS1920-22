<script>

    async function loadGraph() {
        const resData = await fetch("/api/v1/og-basket-stats");
        let dataBasket = await resData.json();
        const resDataApi = await fetch("https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewise", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-tracker-india-covid-19.p.rapidapi.com",
                "x-rapidapi-key": "90dc3e9ed6msh8255970dc0c9066p1c87f3jsn1b79351fbfb0"
            }
        });

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
        let basketApi = dataApi.splice(0,20);
        console.log(basketApi);
        let allDataApi = basketApi.map((d) => {
            let res = {
                name: d.name,
                y: parseInt(d.cases),
                z: parseInt(d.id)  
            };
            return res;
        });


        let allData = allDataBasket.concat(allDataApi);

        console.log(allData);

        //===Grafica===\\
        Highcharts.chart('container10', {

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
                    'Puntos(en caso de baloncesto) : <b>{point.y}</b><br/>' +
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
    <div id='container10'></div>
</main>