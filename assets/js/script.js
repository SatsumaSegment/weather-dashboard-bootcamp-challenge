
const API = "1a711f07d39b42a9b9a418f8a796c5b0"; // API Key

var userSearch = $('#search-input');    // User's search input
var searchButton = $('#search-button'); // Submit button for search form

var coords = []; // Array to store lat and lon coordinates

// Function to get lat and lon based on user's search
function getCoords(event) {
    event.preventDefault(); // Prevent form from refeshing page
    var location = userSearch.val(); // Store user's search

    // Check user entered a value and make sure it isn't a number
    if (location === "" || parseInt(location)) {
        console.log(location);
        return;
    }

    var url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API}` // Geo API for getting lon and lat given user's search

    // Fetch request from API to get coodinates and store in coords array
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        // Use try/catch to check coordinates can be fetched
        try {
            coords.push(data[0].lat);
            coords.push(data[1].lon);
        } catch {
            return;
        }
        getWeatherData(coords);
    })
}

// Function to fetch weather data
function getWeatherData(coords) {
    // Pass lat and lon to the forcast API
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&appid=${API}`;

    var iconUrl = "https://openweathermap.org/img/wn/10d@2x.png";

    // Fetch weather data from API.
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        var name = $('<h4>').text(data.city.name);
        var date = $('<p>').text(dayjs(dayjs().date() + dayjs().month() + dayjs().year()).format('DD MMMM YYYY'));
        var icon = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png');
        var temp = $('<p>').text('Temperature: ' + parseFloat(data.list[0].main.temp - 273.15).toFixed(2) + '°C');
        var hum = $('<p>').text('Humidity: ' + data.list[0].main.humidity + "%");
        var wind = $('<p>').text('Wind Speed: ' + data.list[0].wind.speed + 'm/s');

        $('#today').append(name, date, icon, temp, hum, wind);
    });
}

searchButton.on('click', getCoords);

