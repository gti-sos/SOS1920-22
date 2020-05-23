<script>
    async function loadGraph() {

        const resData = await fetch("/api/v2/formula-stats");

        let Data = await resData.json();

        let years = Array.from(new Set(Data.map((d) => { return d.year; })));
        let countries = Array.from(new Set(Data.map((d) => { return d.country; })));

        let totalpointnumber = Data.map((d) => { return d.totalpointnumber; });
        let pilotnumber = Data.map((d) => { return d.pilotnumber; });
        let victorynumber = Data.map((d) => { return d.victorynumber; });

        console.log(years);
        console.log(pilotnumber);
        console.log(victorynumber);

        Highcharts.chart('contenedor', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Fórmula 1'
            },
 
            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
            xAxis: {
                categories: Data.map(function(d) {return d.year + " " + d.country})
            },
            tooltip: {
                pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    //pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                    name: 'Número de puntos totales',
                    data: totalpointnumber
                },
                {
                    name: 'Número de pilotos',
                    data: pilotnumber
                },
                {
                    name: 'Número de victorias',
                    data: victorynumber
                }
            ]
            });
    }
    loadGraph();
</script>

<main>
    <div id='contenedor'></div>
</main>