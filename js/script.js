var infoWindow;
var ul = document.querySelector('ul.roll');
var map;
var mapa = document.querySelector('div#map');
document.querySelector('button.favo').style.marginLeft = '-100%'
var favorito = document.querySelector('button.favo');
var butlocal = document.querySelector('button.local');
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {
        lat: -32.04, 
        lng: -52.088
    }});
    infoWindow = new google.maps.InfoWindow({
        map: map,
        maxWidth: 200
    });    
    if (navigator.geolocation) { 
        navigator.geolocation.watchPosition(function (position) {
            var positionatual = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            criarmarker(map);
            map.setCenter(positionatual);
            function criarmarker(map) {
                var icon = {
                    url: 'prego.png'
                };
                var marker = new google.maps.Marker({
                    title: 'Sua localização atual é essa',
                    position: positionatual,
                    map: map,
                    icon: icon
                });
            };
            var service = new google.maps.places.PlacesService(map);
            var tipo = document.querySelector('p.resp').innerHTML;
            service.nearbySearch({
                location: positionatual,
                radius: 5000,
                type: [tipo],
                placeId: map.place_id
            }, callback);
            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            }
            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
            
                google.maps.event.addListener(marker, 'click', function () {
                    service.getDetails(place, function (details, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            infoWindow.setContent(details.name);
                            var div = document.querySelector('div.values');
                            div.innerHTML = '<h2 id="name_tag">'+ details.name + '</h2><p id="endereco_tag">' + details.formatted_address + '</p><p id="numero_tag">'+details.formatted_phone_number+'</p><img src='+details.icon+' alt="" >';
                            seila();
                        }
                    });
                    infoWindow.open(map, this);
                });
            }
        },
        function () {
            handleLocationError(true, infoWindow, map.getCenter());
        }, 
        {
            enableHighAccuracy: true,
            maximumAge: 20000,
            timeout: 20000
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
ul.addEventListener('click',function(evento){
    ul.style.marginLeft = '-100%';
    document.querySelector('p.resp').innerHTML = evento.target.id;
    mapa.style.marginLeft = '10%';
    initMap();
});
function seila(){
    document.querySelector('button.favo').style.marginLeft = '35%';
}
favorito.addEventListener('click',function(){
    var v = {
        nome: document.querySelector('h2#name_tag').innerText,
        endereco: document.querySelector('p#endereco_tag').innerText,
        numero: document.querySelector('p#numero_tag').innerText
    };
    localStorage.setItem('favorito'+localStorage.length,JSON.stringify(v));

});
butlocal.addEventListener('click',function(){
    window.location.href = "favoritos.html"    
});