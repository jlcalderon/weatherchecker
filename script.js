// Array to grab the localStorage data from string and render persistent data 
let responsesArray = [];
// String to concatenate the responses ans save each returned response to localstorage string    
let responsesString = localStorage.getItem("weatherResponses");
renderList();
//This functions render the containers to show the cities previously browsed and store in localStorage
function renderList() {
    $('<ul>').html("");
    if (responsesString) {
        responsesArray = responsesString.split('///');
    } else {
        responsesString = " ";
    }
    for (let i = 0; i < responsesArray.length - 1; i++) {
        console.log(JSON.parse(responsesArray[i]));
        let cityEl = $("<li>");
        cityEl.text(JSON.parse(responsesArray[i]).name);
        cityEl.addClass("list-group-item");
        cityEl.addClass("citiesLi");
        cityEl.attr("data-name", JSON.parse(responsesArray[i]).name);
        cityEl.attr("data-lon", JSON.parse(responsesArray[i]).coord.lon);
        cityEl.attr("data-lat", JSON.parse(responsesArray[i]).coord.lat);
        $("ul").append(cityEl);
    }
}

//Submit form function to make an API weather call by city 
$("form").on("submit", function(e) {
    e.preventDefault();
    const city = $('#city-txt').val();
    //my API key
    var APIKey = "4ebb8d7264ca67547a6a7bdbe2deada9";
    //url to make the queries for this API
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    // Asyncronous javascript request usuing ajax
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        //Grabing response from API and printing to console
        console.log(response);
        //Grabing response and storing in a localStorage variable
        if (responsesString !== " ") {
            responsesString = responsesString + JSON.stringify(response) + '///';
        } else {
            responsesString = JSON.stringify(response) + '///';
        }
        localStorage.setItem("weatherResponses", responsesString);
        location.reload();
    });

});

//When user click on a city
$(document).on("click", ".citiesLi", function() {
    // grab the attributes of the element clicked in this
    var city = $(this).attr("data-name");
    //Grab container to display info from empty div in DOM
    const _dataContainer = $('#weatherInCity');
    _dataContainer.html("");
    // Grab the current Json object response in variable by calling a function
    const selectedCity = getCityWeather(city);
    // Dinamically render/create elements with the corresponding data from the object in array
    const _dataCity = $("<h1>");
    let curday = moment().format('MM/DD/YY');
    _dataCity.text(selectedCity[0].name + " " + curday + " Today");
    //Rendering weather icon from API response object stored in the array
    const _dataIcon = $("<img>");
    _dataIcon.attr("src", `http://openweathermap.org/img/w/${selectedCity[0].weather[0].icon}.png`);
    _dataContainer.append(_dataCity);
    _dataContainer.append(_dataIcon);
    //rendering information of weather from API response stored in the array    
    const _dataTemp = $("<p>");
    //Coversion to farenheit /Later I figured it out that we can send unit=imperial to get the temp in farenheit
    _dataTemp.text("Temperature in F: " + ((selectedCity[0].main.temp - 273.15) * 1.80 + 32).toFixed(2));
    _dataContainer.append(_dataTemp);
    const _dataHumidity = $("<p>");

    _dataHumidity.text("Humidity: " + selectedCity[0].main.humidity + "%");
    _dataContainer.append(_dataHumidity);

    const _dataWindSpeed = $("<p>");
    _dataWindSpeed.text("Wind Speed: " + selectedCity[0].wind.speed);
    _dataContainer.append(_dataWindSpeed);
    _dataContainer.attr("style", "border: 2px solid gray");
    //Getting the UV Index by calling the API
    //my API key
    var APIKey = "4ebb8d7264ca67547a6a7bdbe2deada9";
    //url to make the queries for this API
    var urlQuery = `https://api.openweathermap.org/data/2.5/uvi/forecast?appid=${APIKey}&lat=${selectedCity[0].coord.lat}&lon=${selectedCity[0].coord.lon}&cnt=${1}`;
    // Asyncronous javascript request usuing ajax
    $.ajax({
        url: urlQuery,
        method: "GET"
    }).then(function(response) {
        const _dataUVI = $("<p>");
        _dataUVI.text("UV Index: " + response[1].value);
        _dataContainer.append(_dataUVI);
        //_dataContainer.attr("style", "display:inline-block;");
    });

    //Rendering the 5 days forecast with a call to the API for 7 days forecast and skipping 2 days by making a loop narrowed to 5 days
    const _dataFiveDaysForecastContainer = $("#fiveDaysForecast");
    _dataFiveDaysForecastContainer.html("");
    //my API key
    var APIKey = "4ebb8d7264ca67547a6a7bdbe2deada9";
    //url to make the queries for this API
    var fiveDaysForcastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedCity[0].coord.lat}&lon=${selectedCity[0].coord.lon}&exclude=current,minutely,hourly&units=imperial&appid=${APIKey}`;
    // Asyncronous javascript request usuing ajax
    $.ajax({
        url: fiveDaysForcastUrl,
        method: "GET"
    }).then(function(response) {
        for (let i = 0; i <= 4; i++) {
            const forecastEL = $("<div>");
            forecastEL.addClass("card");
            forecastEL.attr("style", "width: 14rem; display:inline-block; background-color:royalblue; color:white;");
            const forecastELBody = $("<div>");
            forecastELBody.addClass("card-body");
            const forecastELTitle = $("<h5>");
            forecastELTitle.addClass("card-title");
            //Converting unix utc date time to a readable format for user
            forecastELTitle.text(`${moment(new Date(parseInt(response.daily[i].dt)*1000)).format("MM/DD/YY")}`);
            const _icon = $("<img>");
            _icon.attr("src", `http://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png`);
            const _temp = $("<p>").text("Temperature F. : " + response.daily[i].temp.day);
            const _humidity = $("<p>").text("Humidity: " + response.daily[i].humidity + " %");
            const _wind = $("<p>").text("Wind Speed: " + response.daily[i].wind_speed);
            const _uvI = $("<p>").text("UV Index: " + response.daily[i].uvi);
            forecastELBody.append(forecastELTitle);
            forecastELBody.append(_icon);
            forecastELBody.append(_temp);
            forecastELBody.append(_humidity);
            forecastELBody.append(_wind);
            forecastELBody.append(_uvI);
            forecastEL.append(forecastELBody);
            _dataFiveDaysForecastContainer.append(forecastEL);
        }
    });
});

//Function that returns the json object response store in the array
function getCityWeather(_city) {
    let tempArray = [];
    for (let j = 0; j < responsesArray.length - 1; j++) {
        tempArray.push(JSON.parse(responsesArray[j]));
    }
    return tempArray.filter((w) => w.name === _city);
}