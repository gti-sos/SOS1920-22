<script>
    async function loadGraph() {
    const resData = await fetch("/api/v1/swim-stats");
    let Data = await resData.json();
    let arrayData = 
        Data.map((d) => {
            let res = [
                Date.parse(""+d.year+""),
                d.time,
                d.country
                ]
        return res   
                    });
    const resDataApi = await fetch("https://sos1920-25.herokuapp.com/api/v1/global_competitiveness_index");
    let dataApi = await resDataApi.json();
    function Comparator(a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
        }
    let allDataApi = dataApi.map((d) => {
        let res = [
            Date.parse(""+d.year+""),
            d.index
    ];
        return res;
    });

    Highcharts.stockChart('content25', {


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
            name: 'Índice de competitividad',
            data: allDataApi.sort(Comparator)
            }]
    });
    
}
loadGraph();
</script>

<main>
<div id='content25'></div>
</main>