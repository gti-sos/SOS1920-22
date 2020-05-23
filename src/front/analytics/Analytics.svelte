<script>

    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph() {

        const resDataFormula = await fetch("/api/v2/formula-stats");
        const resDataBasket = await fetch("/api/v1/og-basket-stats");
        const resDataSwim = await fetch("/api/v1/swim-stats/");

        let formula = await resDataFormula.json();
        let basket = await resDataBasket.json();
        let swim = await resDataSwim.json();

        let dataFormula = formula.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["totalpointnumber"]
            };
            return res;
        });

        let dataBasket = basket.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["points"]
            };
            return res;
        });

        let dataSwim = swim.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["time"]
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
                    name: "Puntos totales en partido de Baloncesto",
                    data: dataBasket
                },
                {
                    name: "Tiempo total",
                    data: dataSwim
                }
            ];

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: {
                text: 'Mezcla de APIs'
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
        <p class="highcharts-description">
            Gráfica que muestra los datos de las 3 APIs. Son los número de puntos totales en Fórmula 1 por nacionalidad,
            el tiempo que se tarda en natación y el número de puntos por partido de baloncesto.
        </p>
    </figure>

</main>