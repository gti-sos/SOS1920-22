<script>
    import { onMount } from 'svelte';

    async function loadGraph() {

        const resData = await fetch("/api/v1/og-basket-stats");
        let dataBasket = await resData.json();
        console.log("Base de datos:" + dataBasket);

        //===Creo dos Arrays para unirlas===\\
        let countryes = dataBasket.map((d) => { return d.country });
        console.log("Lista de Paises:  " + countryes);
        let points = dataBasket.map((d) => { return d.points; });
        console.log("Lista de Puntos:  " + points);
        let years = dataBasket.map((d) => { return d.year });
        console.log("Lista de los años" + years);
        let rebound = dataBasket.map((d) => { return d.rebounds });
        console.log("Lista de los rebotes" + rebound);
        let threepoint = dataBasket.map((d) => { return d.threepoints });
        console.log("Lista de los tiros de tres" + threepoint);


        var tam = countryes.length;
        console.log("Tamaño:  " + tam);
        var aux = ["x", "Puntos", "Puntos de Triples", "Rebotes"];
        var allData = [];
        //===Meter Datos===\\
        for (var i = 0; i < tam + 1; i++) {
            allData[i] = aux;
            aux = [];
            aux.push(countryes[i] + " (" + years[i] + ") ", points[i], threepoint[i], rebound[i]);

        }
        console.log(allData);



        console.log("Entra dentro");
        var chart = bb.generate({

            data: {
                x: "x",
                columns: allData,
                type: "radar",
                labels: true
            },
            radar: {
                axis: {
                    max: 120
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
            }


        });

    }

    onMount(loadGraph);
</script>

<main>
    <div id="radarChart">Grafica Baloncesto</div>
</main>