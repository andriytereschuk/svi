var map = document.getElementById('map');

function init() {
    var center = new google.maps.LatLng(51.486990, 23.858008);

    var settings = {
        center: center,
        zoom: 14,
        disableDefaultUI: true,
        styles: [
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    { "color": "#ffffff" }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "stylers": [
                    { "color": "#ffffff" },
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    { "color": "#80C8E5" },
                    { "saturation": 0 }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    { "color": "#999999" }
                ]
            }
            , {
                "elementType": "labels.text.stroke",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
            , {
                "elementType": "labels.text",
                "stylers": [
                    { "color": "#333333" }
                ]
            }

            , {
                "featureType": "road.local",
                "stylers": [
                    { "color": "#dedede" }
                ]
            }
            , {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [
                    { "color": "#666666" }
                ]
            }
            , {
                "featureType": "transit.station.bus",
                "stylers": [
                    { "saturation": -57 }
                ]
            }
            , {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "poi",
                "stylers": [
                    { "visibility": "off" }
                ]
            }

        ]
    };

    var places = [
        ['Набережна, 45', 51.486050, 23.863358, 1, 'images/marker1.png'],
        ['Набережна, 29', 51.486450, 23.858460, 1, 'images/marker2.png'],
        ['Пляж', 51.488150, 23.854300, 1, 'images/beach-marker.png'],
        ['Пляж', 51.490200, 23.856800, 1, 'images/beach-marker.png'],
        ['Пляж', 51.492060, 23.863220, 1, 'images/beach-marker.png'],
        ['Зупинка "Школа"', 51.480770, 23.867220, 1, 'images/bus-marker.png']
    ];

    var map = new google.maps.Map(document.getElementById("map"), settings);
    setMarkers(map, places);

    function setMarkers(map, locations) {
        for (var i = 0; i < places.length; i++) {
            var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: locations[i][0],
                icon: places[i][4]
            });
        }
    }
};

google.maps.event.addDomListener(window, 'load', init);
