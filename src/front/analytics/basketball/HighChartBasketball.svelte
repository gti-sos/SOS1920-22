<script>

    async function loadGraph() {
        const resData = await fetch("/api/v1/og-basket-stats");
        let dataBasket = await resData.json();
        console.log("Base de datos:" + dataBasket);

        //===Creo dos Arrays para unirlas===\\
        let countryes = dataBasket.map((d) => {return d.country});
        console.log("Lista de Paises:  " + countryes);
        let points = dataBasket.map((d) => { return d.points; });
        console.log("Lista de Puntos:  " + points);
        //===Lista de listas con paises y años===\\
       
        var paisAnyo=[];
        var tam =  countryes.length;
        console.log("Tamaño:  " + tam);
        var allData = new Array(tam);

        //===Crear lista de listas===\\
        for(var i=0; i<tam; i++) {
            paisAnyo.push(countryes[i],points[i]);
            allData[i] = paisAnyo;
            paisAnyo=[];
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
                text: 'Contents of Highsoft\'s weekly fruit delivery'
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
    <h6 style="color:rgb(187, 0, 0)"> Atención: Si un pais se repite es porque es de otro año.</h6>
</main>