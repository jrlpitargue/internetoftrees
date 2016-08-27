$(document).ready(function() {
    function initialize() {
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
                $.each(data[0], function(index, val) {
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(val.lat, val.lng)
                    });
                    marker.setMap(map);
                    google.maps.event.addListener(marker,'click',function() {
                        template = [
                            '<h5>', val.name, '</h5>',
                            '<hr />',
                            
                        ].join('');
                    });
                });
            },
            error: function(data) {

            },
        });
    };
    initialize();



});
