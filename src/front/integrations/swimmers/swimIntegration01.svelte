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
    const resDataApi = await fetch("https://sos1920-01.herokuapp.com/api/v2/poverty-stats");
    let dataApi = await resDataApi.json();
    function Comparator(a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
        }
    let allDataApi = dataApi.map((d) => {
        let res = [
            Date.parse(""+d.year+""),
            d.poverty_prp
    ];
        return res;
    });

    Highcharts.stockChart('content01', {


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
            name: 'PRP Stat',
            data: allDataApi.sort(Comparator)
            }]
    });
    
}
loadGraph();
</script>

<main>
<div id='content01'></div>
</main>