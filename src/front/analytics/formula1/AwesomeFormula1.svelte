<canvas id="myChart" width="3" height="1"></canvas>

<script>
    import { onMount } from 'svelte';
    import {
        pop
    } from "svelte-spa-router";

    async function loadGraph() {

        const resData = await fetch("/api/v2/formula-stats");

        let Data = await resData.json();

        /*let years = Array.from(new Set(Data.map((d) => {return d.year;})));
        let countries = Array.from(new Set(Data.filter(d => d.year == 2014).map((d) => {return d.country;})));
        let totalpointnumber= Array.from(new Set(Data.filter(d => d.year == 2014).map((d) => {return d["totalpointnumber"];})));*/

        let years = Data.map((d) => { return d.year; });
        let countries = Data.map((d) => { return d.country; });
        let totalpointnumber = Data.map((d) => { return d["totalpointnumber"]; });

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: countries,
                datasets: [{
                    label: 'Número de puntos totales',
                    data: totalpointnumber,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    onMount(loadGraph);


</script>
<main>
    <p>Gráfica que representa el número de puntos que tienen los pilotos de Fórmula 1 por nacionalidad.</p>
</main>