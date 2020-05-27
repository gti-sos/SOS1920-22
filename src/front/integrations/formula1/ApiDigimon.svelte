<script>

    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph() {

        //OK

        const resDataFormula = await fetch("/api/v2/formula-stats");
        const resDataDigimon = await fetch("/api/digimon");

        let formula = await resDataFormula.json();
        let digimon = await resDataDigimon.json();
        console.log(digimon);

        let dataFormula = formula.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["totalpointnumber"]
            };
            return res;
        });

        let dataDigimon = digimon.map((d) => {
            let res = {
                name: d.name,
                value: parseInt(d["level"])
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
                    name: "Rango de un Digimon",
                    data: dataDigimon
                }
            ];

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: {
                text: 'Relación entre el nivel de un Digimon y el número de puntos totales de pilotos de Fórmula 1'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '60%',
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

<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>

</svelte:head>

<main>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfica que muestra los datos de las 3 APIs. Son los número de puntos totales en Fórmula 1 por nacionalidad,
            el tiempo que se tarda en natación y el número de puntos por partido de baloncesto.
        </p>
    </figure>

</main>