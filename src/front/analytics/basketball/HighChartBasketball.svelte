<script>

    async function loadGraph() {
        const resData = await fetch("/api/v1/og-basket-stats");
        let dataBasket = await resData.json();
        console.log("Base de datos:" + dataBasket);

        //===Creo dos Arrays para unirlas===\\
        let countryes = dataBasket.map((d) => { return d.country });
        console.log("Lista de Paises:  " + countryes);
        let points = dataBasket.map((d) => { return d.points; });
        console.log("Lista de Puntos:  " + points);
        let years = dataBasket.map((d) => { return d.year });
        console.log("Lista de los años");
        //===Lista de listas con paises y años===\\

        var tam = countryes.length;
        console.log("Tamaño:  " + tam);
        var allData = [];

        //===Meter Datos===\\
        for (var i = 0; i < tam; i++) {
            allData.push({
                name: countryes[i],
                y: points[i],
                z: years[i]
            });
        }


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