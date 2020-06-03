<script>
    async function loadGraph() {
        const resData = await fetch("/api/v1/swim-stats");
        let Data = await resData.json();
        let arrayData =
            Data.map((d) => {
                let res = [
                    Date.parse("" + d.year + ""),
                    d.time,
                    d.country
                ]
                return res
            });
        const resDataApi = await fetch("https://free-football-soccer-videos1.p.rapidapi.com/v1/", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "free-football-soccer-videos1.p.rapidapi.com",
                "x-rapidapi-key": "1f1b304948msh7fb31db2cfdf5cbp13d1efjsn2918af550b42"
            }
        });
        let dataApi = await resDataApi.json();
        function Comparator(a, b) {
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            return 0;
        }
        let allDataApi = dataApi.map((d) => {
            let res = [
                Date.parse("" + d.date + ""),
                d.competition.id
            ];
            return res;
        });

        Highcharts.stockChart('competition', {


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
            {
                name: 'Football ID',
                data: allDataApi.sort(Comparator)
            }]
        });

    }
    loadGraph();
</script>

<main>
    <div id='competition'></div>
</main>