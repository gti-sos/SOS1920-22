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
    const resDataApi = await fetch("/api/v1/ppas");
    let dataApi = await resDataApi.json();
    function Comparator(a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
        }
    let allDataApi = dataApi.map((d) => {
        let res = [
            Date.parse(""+d.year+""),
            d.aas_gross
    ];
        return res;
    });

    Highcharts.stockChart('content28', {


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
            name: 'AAS Gross Index',
            data: allDataApi.sort(Comparator)
            }]
    });
    
}
loadGraph();
</script>

<main>
<div id='content28'></div>
</main>