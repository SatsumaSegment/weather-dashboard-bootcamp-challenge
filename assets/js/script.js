
const API = "1a711f07d39b42a9b9a418f8a796c5b0"; // API Key

var userSearch = $('#search-input');
var searchButton = $('#search-button');



function getCoords(e) {
    e.preventDefault();
    var location = userSearch.val();
    var url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API}` // Geo API for getting lon and lat

    var coords = [];

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        coords.push(data[0].lat);
        coords.push(data[0].lon);
        return;
    });

    return coords;
}

searchButton.on('click', getCoords);

