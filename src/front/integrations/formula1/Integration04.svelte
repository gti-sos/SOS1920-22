<script>

    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph() {

        //OK

        const resDataFormula = await fetch("/api/v2/formula-stats");
        const resDataVehicles = await fetch("https://sos1920-04.herokuapp.com/api/v1/vehicles");

        let formula = await resDataFormula.json();
        let vehicles = await resDataVehicles.json();
        console.log(vehicles);

        let dataFormula = formula.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["totalpointnumber"]
            };
            return res;
        });

        let dataVehicles = vehicles.map((d) => {
            let res = {
                name: d.province + " - " + d.year,
                value: d["total"]
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
                    name: "Número de vehículos",
                    data: dataVehicles
                }
            ];

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: {
                text: 'Relación entre el número total de inmigrantes por país y el número de puntos totales de pilotos de Fórmula 1'
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

<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>

</svelte:head>

<main>

    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>

</main>