function build_chart (categories, values, type) {
    let sub = '';

    switch (type) {
        case 'trees': sub = 'Trees'; break;
        case 'endangered': sub = 'Endangered/Endemic'; break;
        case 'invasive': sub = 'Invasive'; break;
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

                if (type === 'trees') {
                    if (val.name in results) {
                        results[val.name.toLowerCase()] += 1;
                    }
                    else {
                        results[val.name.toLowerCase()] = 1;
                    }
                }
                else if (type === 'endangered') {
                    if (val.status.endangered in results) {
                        if (typeof val.status.endangered === 'undefined') {
                            results['false'] += 1;
                        }
                        else {
                            results[val.status.endangered.toString().toLowerCase()] += 1;
                        }
                    }
                    else {
                        if (typeof val.status.endangered === 'undefined') {
                            results['false'] = 1;
                        }
                        else {
                            results[val.status.endangered.toString().toLowerCase()] = 1;
                        }
                    }
                }
                else {
                    if (val.status.invasive in results) {
                        if (typeof val.status.invasive === 'undefined') {
                            results['false'] += 1;
                        }
                        else {
                            results[val.status.invasive.toString().toLowerCase()] += 1;
                        }
                    }
                    else {
                        if (typeof val.status.invasive === 'undefined') {
                            results['false'] = 1;
                        }
                        else {
                            results[val.status.invasive.toString().toLowerCase()] = 1;
                        }
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
    let invas = $('#invasive');

    trees.click((e) => {
        if(process_command('trees')) {
            trees.addClass('active');
            endan.removeClass('active');
            invas.removeClass('active');
        }
    });

    endan.click((e) => {
        if(process_command('endangered')) {
            trees.removeClass('active');
            endan.addClass('active');
            invas.removeClass('active');
        }
    });

    invas.click((e) => {
        if(process_command('invasive')) {
            trees.removeClass('active');
            endan.removeClass('active');
            invas.addClass('active');
        }
    });

    process_command(type);
}