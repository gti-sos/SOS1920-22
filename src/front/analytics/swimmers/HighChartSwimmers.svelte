<script>
        async function loadGraph() {
        const resData = await fetch("/api/v1/swim-stats");
        let Data = await resData.json();
        let years = Array.from(new Set(Data.map((d) => { return d.year; })));
        let countries = Array.from(new Set(Data.map((d) => { return d.country; })));
        let arrayData = 
            Data.map((d) => {
                let res = [
                    Date.parse(""+d.year+""),
                    d.time,
                    ]
            return res   
                        });
        function Comparator(a, b) {
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            return 0;
            }
        let yearofbirth = Data.map((d) => { return d.yearofbirth; });
        let position = Data.map((d) => { return d.position; });
        let time = Data.map((d) => { return d.time; });

        console.log(arrayData);
        console.log(time);
        console.log(position);

        Highcharts.stockChart('content', {


            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'Natación'
            },

            scrollbar: {
                enabled: false
            },

            series: [{
                name: 'Tiempo',
                data: arrayData.sort(Comparator)
                },
                /*{
                name: 'Año',
                data: years
                },
                {
                name: 'Posición',
                data: position
                }*/]
        });
        
    }
    loadGraph();
</script>

<main>
    <div id='content'></div>
</main>