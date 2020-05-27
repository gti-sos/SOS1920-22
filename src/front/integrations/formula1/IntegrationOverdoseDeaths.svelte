<script>
    import {
        onMount
    } from "svelte";


    onMount(loadGraph);

    //Pruebas para ver si funciona el proxy: Done.
    async function loadGraph() {
        const res = await fetch("/proxyOverdoseDeaths");
        const data = await res.json();
    }

    //Integración de Francisco Mohedano - Grupo 09
    async function integration09() {
        const res = await fetch("/api/v2/formula-stats");
        const data09 = await fetch("https://sos1920-09.herokuapp.com/api/v4/renewable-sources-stats");
        console.log(data09);

        let data = await res.json();
        let francisco = await data09.json();

        let countries = data.map((x) => { return x.country; });
        let countriesFrancisco = francisco.map((x) => { return x.country; });

        let totalpointnumber = data.map((d) => { return d.totalpointnumber; });
        let pilotnumber = data.map((d) => { return d.pilotnumber; });
        let victorynumber = data.map((d) => { return d.victorynumber; });

        let porcentaje = francisco.map((x) => { return parseInt(x["percentage-re-total"]) });

        data = data.map((x) => { x.country && x.year });

        //Ejemplo de sus datos

        /*{
            country: "Panama",
            year: 2017,
            percentage - re - total: 8.1,
            percentage - hydropower - total: 77.7,
            percentage - wind - power - total: 32.1
        }*/

        //Lo dejamos en stand-by
        /*data = data.map((x) => {
            //return [countries.indexOf(x.country), x.year, x["totalpointnumber"], x["pilotnumber"], x["victorynumber"]];
            return [x.country, x.year, x["totalpointnumber"], x["pilotnumber"], x["victorynumber"]];
        });

        data = data.filter((x) => { return francisco.find(y => y.name == countries[x[0]] && y.year == x[1]) }).map((x) => {
            return [x[0], x[1], x[2], x[3], x[4],
            //francisco.find(y => y.name == countries[x[0]] && y.year == x[1])["percentage-re-total"]
            francisco.find(y => y.name == x[0] && y.year == x[1])["percentage-re-total"]
            ];
        });

        let datos = data.map(function (set, i) {
            return {
                name: countries[set[0]],
                data: set,
                shadow: false
            };
        });*/

        Highcharts.chart('contenedor-09', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'API de Fórmula 1 junto a porcentaje de uso de energías renovables'
            },

            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
            xAxis: {
                categories: data.map(function (d) { return d.year + " " + d.country })
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
            },
            {
                name: 'Porcentaje de uso de energías renovables',
                data: porcentaje
            }
            ]
        });
    }
    integration09();
</script>


<main>
    <div id='contenedor-09'></div>
</main>