
const API = "1a711f07d39b42a9b9a418f8a796c5b0"; // API Key

var userSearch = $('#search-input');    // User's search input
var searchButton = $('#search-button'); // Submit button for search form

var coords = []; // Array to store lat and lon coordinates

// Function to get lat and lon based on user's search
function getCoords(event) {
    event.preventDefault(); // Prevent form from refeshing page
    var location = userSearch.val(); // Store user's search
    var url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API}` // Geo API for getting lon and lat given user's search

    // Fetch request from API to get coodinates and store in coords array
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        coords.push(data[0].lat);
        coords.push(data[1].lon);
    }).then(getWeatherData(coords)); // Call the getWeatherData function passing the coods array
}

// Function to fetch weather data
function getWeatherData(coords) {
    // Round lat and lon coordinates to 2 decimal places
    var lat = Math.floor(coords[0] * 100) / 100;
    var lon = Math.floor(coords[1] * 100) / 100;
    var url = "api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}"; // Pass lat and lon to the forcast API

    // Fetch weather data from API.
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        return;
    });
}

searchButton.on('click', getCoords);

