function treeChart(tree) {
    let input = {
        Acacia: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        Narra: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
        Mango: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
        Palm: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    };
    $('#dataGraph').highcharts({
        title: {
            text: 'Monthly Average Growth Rate',
            x: -20 //center
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Growth Rate'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: tree,
            data: input[tree]
        }]
    });
};

function initialize_map() {
    var mapProp = {
        center:new google.maps.LatLng(14.1613, 121.240131),
        zoom:15,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map"),mapProp);

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8000/api/trees',
        success: function(data) {
            $.each(data[0], function(key, val) {
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(val.lat, val.lng)
                });
                let coords = new google.maps.InfoWindow({
                    content:"<b>Lattitude:</b> " + val.lat + "<br /><b>Longitude:</b> " + val.lng
                });
                let tags = '';
                if(val.status != null) {
                    $.each(val.status, function(key, state) {
                        if(key == 'endangered') {
                            tags = tags + '<span class="new badge red" data-badge-caption="endangered"></span>';
                        } else {
                            tags = tags + '<span class="new badge purple darken-2" data-badge-caption="invasive"></span>';
                        }
                    });
                }

                marker.setMap(map);
                google.maps.event.addListener(marker,'click',function() {
                    coords.open(map, marker);
                    template = [
                        '<ul class="collection with-header" >',
                            '<li class="collection-header row">',
                                '<div class="col s10">',
                                    '<h4>', val.name, '</h4>',
                                    tags,
                                    '<span href="#" class="new badge grey darken-2" data-badge-caption="+"></span>',
                                '</div>',
                                '<a class="wiki" href="',val.wiki,'"><i class="material-icons">keyboard_arrow_right</i></a>',
                            '</li>',
                            '<li class="collection-item">Family: ',val.familyName,'</li>',
                            '<li class="collection-item">Sea Level: ',val.seaLevel,'</li>',
                        '</ul>',
                        '<div id="about">',
                            '<i>Forester\'s Notes</i><br />',
                            val.notes,
                        '</div>'
                    ].join('');
                    $('.detail-container').empty();
                    $('.detail-container').append(template);
                });
            });
        },
        error: function(data) {

        },
    });
};

$(document).ready(function() {
    initialize_map();
});
