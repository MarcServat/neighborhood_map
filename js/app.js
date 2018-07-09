var app = app || {};

var ViewModel = function() {
    this.climbingTypes = ko.observableArray(['boulder', 'rope']),
    this.permissionChanged = function (obj, event) {
        console.log(event)
        if (event.originalEvent) { //user changed
      
        } else { // program changed
      
        }
      
      }
};

ko.applyBindings(new ViewModel());


function placeMarkers(map) {
    for (var {title, lat, lng, content} of places) {
        var marker = new google.maps.Marker({
            position: {lat, lng},
            title,
            map
        });
        var infowindow = new google.maps.InfoWindow({ content });
        marker.addListener('click', (function(marker,content,infowindow){ 
            return function() {
                infowindow.setContent(content);
                infowindow.open(map,marker);
            };
        })(marker,content,infowindow)); 
    }
}

function googleMapsError() {
    alert('Google Maps could not be loaded');
}

function initMap(a) {
    var mapElem = document.getElementById('mapview');

    var options = {
        center: new google.maps.LatLng(41.415723, 2.21055),
        zoom: 13,
        styles: styles
    };

    // Initialize map instance
    map = new google.maps.Map(mapElem, options);
    
    this.placeMarkers(map);
    
}

$(function () {
	'use strict';

	new app.AppView();
});