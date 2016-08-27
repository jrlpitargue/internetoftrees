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
