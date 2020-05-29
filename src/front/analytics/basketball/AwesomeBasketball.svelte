<script>
    import { onMount } from 'svelte';

    async function loadGraph() {

        const resData = await fetch("/api/v1/og-basket-stats");
        let dataBasket = await resData.json();
        console.log("Base de datos:" + dataBasket);

        let allData = dataBasket.map((d) => {
            let res = [d.country + "(" + d.year + ")", d.points, d.threepoints, d.rebounds];
            return res;
        });
        console.log(allData);

        let numbers = dataBasket.map((d)=> {return d.points});
        let axisSize = Math.max.apply(null, numbers) + 10;


        //===Grafica===\\
        var chart = bb.generate({

            data: {
                columns: allData,
                type: "radar",
                labels: true
            },

            radar: {
                axis: {
                    max: axisSize
                },
                level: {
                    depth: 2
                },
                direction: {
                    clockwise: true
                }
            },

            size: {
                width: 640,
                height: 480
            },

            bindto: "#radarChart"
        });
    }

    onMount(loadGraph);
</script>


<main>
    <div align="center">
        <div id="radarChart" align="center">Grafica Baloncesto</div>
    </div>
</main>