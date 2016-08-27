function build_chart (categories, values, type) {
    let sub = '';

    switch (type) {
        case 'trees': sub = 'Trees'; break;
        case 'endangered': sub = 'Endangered/Endemic'; break;
    }

    $('#container').highcharts({
        chart: { 
            zoomType: 'xy',
            type: 'column'
            },
        title: { text : 'Demographics of Trees'},
        subtitle : { text : 'by ' + sub },
        xAxis : [{
            categories : categories,
            crosshair: true,
            title: { text: sub }
        }],
        yAxis: [{
            min: 0,
            title: { text: 'Frequency' },
        }],
        series: values,
        tooltip: { shared: true },
    });

    return true;
}

function bind_anchors () {

}

function process_command (type) {
    let results = {};
    let categories = [];
    let values = [];

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8000/api/trees',
        success: function(data) {
            $.each(data[0], function(index, val) {
                if (type !== 'trees') {
                    if (val.name in results) {
                        results[val.name] += 1;
                    }
                    else {
                        results[val.name] = 1;
                    }
                }
                else {
                    if (val.endangered in results) {
                        results[val.endangered] += 1;
                    }
                    else {
                        results[val.endangered] = 1;
                    }
                }
            });

            $.each(Object.keys(results), (index, val) => {
                categories.push(val);
                values.push({ name: val, data: [results[val]] });
            });

            return build_chart(categories, values, type);
        },
        error: function (data) {
            return;
        }
    });
}

function initialize_charts (type) {
    let trees = $('#trees');
    let endan = $('#endangered');

    trees.click((e) => {
        if(process_command('trees')) {
            trees.addClass('active');
            endan.removeClass('active');
        }
    });

    endan.click((e) => {
        if(process_command('endangered')) {
            trees.removeClass('active');
            endan.addClass('active');
        }
    });

    process_command(type);
}