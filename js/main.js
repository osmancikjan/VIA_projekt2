function initMap() {
    var icon = {
        url: "img/home.svg",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 40)
    };
    var uluru = { lat: 49.835831, lng: 18.041100 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: icon
    });
}