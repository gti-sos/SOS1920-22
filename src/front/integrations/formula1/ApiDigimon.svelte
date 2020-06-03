<script>

    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph() {

        //OK

        const resDataFormula = await fetch("/api/v2/formula-stats");
        const resDataDigimon = await fetch("https://jikan1.p.rapidapi.com/top/anime/1/upcoming", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "jikan1.p.rapidapi.com",
                "x-rapidapi-key": "7bc52e4b37msh757136e9b4c40b4p19bc8bjsn5cf2bde828bc"
            }
        })

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
        let PokemonApi = digimon.top;
        console.log(PokemonApi);
        let dataDigimon = PokemonApi.map((d) => {
            let res = {
                name: d.title,
                value: d["rank"]
            };
            return res;
        });
        console.log(dataDigimon);
        let dataTotal =
            [
                {
                    name: "Número de puntos totales de Fórmula 1",
                    data: dataFormula
                },
                {
                    name: "Ranking de animes top",
                    data: dataDigimon
                }
            ];

        Highcharts.chart('container1', {
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
        <div id="container1"></div>
    </figure>

</main>