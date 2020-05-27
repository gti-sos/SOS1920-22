<script>

    //Pruebas para ver si funciona el proxy: Done.
    async function loadGraph() {

        const resOD = await fetch("/api/v2/overdose-deaths");
        const resDataFormula = await fetch("/api/v2/formula-stats");

        let overdose = await resOD.json();
        let formula = await resDataFormula.json();
        
        console.log(overdose);

        let dataFormula = formula.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["totalpointnumber"]
            };
            return res;
        });

        let dataOverdose = overdose.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["death_total"]
            };
            return res;
        });

        let dataTotal =
            [
                {
                    name: "Número de puntos totales de Fórmula 1",
                    data: dataFormula
                },
                {
                    name: "Número total de fallecidos por sobredosis",
                    data: dataOverdose
                }
            ];

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: {
                text: 'Relación entre fallecimientos por sobredosis y el número de puntos totales de pilotos de Fórmula 1 por nacionalidad'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series: dataTotal
        });
    }

</script>


<main>
    <div id='container'></div>
</main>