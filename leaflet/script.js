(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([37.777081, -121.967522], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var dublin = L.marker([37.723903, -121.940644]).addTo(map);
    var crowcanyon = L.marker([37.769392, -122.004233]).addTo(map);
    var athan = L.marker([37.749625, -121.956812]).addTo(map);
    var danville = L.marker([37.822051, -122.000866]).addTo(map);

    var bellingham = L.circle([37.765232, -121.899648], {
        color: 'blue',
        fillColor: 'rgb(0, 213, 255)',
        fillOpacity: 0.5,
        radius: 75
    }).addTo(map);

    var interesection = L.circle([37.777209, -121.975306], {
        color: 'blue',
        fillColor: 'rgb(0, 213, 255)',
        fillOpacity: 0.5,
        radius: 75
    }).addTo(map);

    var dvhs = L.polygon([
        [37.771361, -121.902520],
        [37.767036, -121.905072],
        [37.768156, -121.900441]
    ]).addTo(map);

    var canyonlake = L.polygon([
        [37.783810, -121.948932],
        [37.783556, -121.944752],
        [37.786642, -121.946767]
    ]).addTo(map);

    dublin.bindPopup("<b>dublin, ca</b><br>let me out... let me outttt");
    crowcanyon.bindPopup("<b>crow canyon road</b><br>drove here once at night and got super scared");
    athan.bindPopup("<b>athan downs</b><br>always thought this place had the coolest name ever");
    danville.bindPopup("<b>danville</b><br>brrzz rich guy alert");
    bellingham.bindPopup("<b>bellingham square</b><br>a place where I go to sneeze");
    interesection.bindPopup("<b>i680</b><br>fast travel");
    dvhs.bindPopup("<b>dv</b><br>a very silly school");
    canyonlake.bindPopup("<b>canyon lake</b><br>i have never seen this place in my life");

    // var popup = L.popup();

    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(map);
    // }

    // map.on('click', onMapClick);

}());