function initialize_charts () {
    $('#charts').highcharts({
        chart: { zoomType: 'xy' },
        title: { text : 'Evaluation from January to December '},
        subtitle : { text : 'Grouped by ' },
        xAxis : [{
            categories : [],
            crosshair: true
        }],
        yAxis: [{
            gridLineWidth: 0,
            title: { text: 'Median' }
        }],
        tooltip: { shared: true },
        series : []
    });
}