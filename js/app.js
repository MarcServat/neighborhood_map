var app = app || {};
var map;
var infoWindow;

var ViewModel = function() {
    var self = this;

    this.searchItem = ko.observable('');

    this.markersList = ko.observableArray([]);

    // Place markers
    places.forEach(function(place) {
        self.markersList.push(new MarkerService(place));
    });

    // Filter Locations
    this.locationList = ko.computed(() => {
        var searchFilter = this.searchItem().toLowerCase();
        if (searchFilter) {
            return ko.utils.arrayFilter(this.markersList(), function(marker) {
                var str = marker.title.toLowerCase();
                var result = str.includes(searchFilter);
                marker.visible(result);
				return result;
			});
        }
        return ko.utils.arrayForEach(this.markersList(), function(marker){
            marker.visible(true) 
        });
    });
};


// Marker Service
var MarkerService = function(data) {
    var self = this;

    this.title = data.title;
    this.lat = data.lat;
    this.lng = data.lng;
    this.content = data.content;

    this.visible = ko.observable(true);

    // Create a marker per location, and put into markers array
    this.marker = new google.maps.Marker({
        position: {lat: this.lat, lng: this.lng},
        title: this.title,
        content: this.content
    });    

    self.filterMarkers = ko.computed(function () {
        // set marker and extend bounds (showListings)
        if(self.visible() === true) {
            self.marker.setMap(map);
        } else {
            self.marker.setMap(null);
        }
    });
    
    // Create an onclick even to open an indowindow at each marker
    this.marker.addListener('click', function() {
        populateInfoWindow(this, infoWindow);
        map.panTo(this.getPosition());
    });

};

// Add info to each marker
function populateInfoWindow(marker, infowindow) {
    // Info to display at the marker
    var windowContent = `<h4>${marker.title}</h4><p>${marker.content}</p>`       
    infowindow.setContent(windowContent);
   
    infowindow.open(map, marker);
};

// handle error Google API fails
var gogleMapsError = function() {
    alert('Google Maps could not be loaded');
}

// Google maps init
function initMap() {
    var mapElem = document.getElementById('mapview');

    var options = {
        center: new google.maps.LatLng(41.415723, 2.21055),
        zoom: 13,
        styles: styles
    };

    // Initialize map instance
    map = new google.maps.Map(mapElem, options);

    infoWindow = new google.maps.InfoWindow();
    
    ko.applyBindings(new ViewModel());
};
