function initialize() {
    var mapProp = {
        center:new google.maps.LatLng(14.1613, 121.240131),
        zoom:15,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);
