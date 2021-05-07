# Weather checker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```This repository contains a weather checker app```

* [Overview](#Overview)
* [Tech Specs](#Tech_Specs)
* [User Story](#User_Story)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Questions](#Questions)
* [Go to live app](https://jlcalderon.github.io/weatherchecker/)

## Overview
This application allows users to create a personalized list of cities, for reviewing their weather conditions in the current week, so that they can plan a trip / activity accordingly. This is basically a weather dashboard that will run in your browser and feature dynamically updated to the HTML and CSS and store data in a persistent way.

## Tech_Specs

This application was developed with Plain Vanila Javascript and the server side API: `[OpenWeather API](https://openweathermap.org/api)` to retrieve weather data for the cities to look up. To keep a history persisten of the cities searched this app rely on the browser's  `localStorage`.

## User_Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Usage

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

## License
This is an open source app. This app is cover under the **MIT** licences terms. For more information open this link to see the app licence terms of use [*Licence*](https://opensource.org/licenses/MIT)

## Contributing
If you would like to contribute to this app, feel free to do so. Please know that any contribution will be check and verify before to add it to the production app environment. you can `fork` and `clone` this repository make your changes `push to your branch` and make a `pull request` to compare your code and the main branch across forks and put your changes/additions/corrections on this project.

## Questions
Any further question about this project email direct to <jlcalderonfuentes@gmail.com> feel free to reach out and follow me on [Github](https://github.com/jlcalderon).
