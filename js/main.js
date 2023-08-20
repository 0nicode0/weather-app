import { WEATHER_API_KEY, PEXELS_API_KEY } from "./apiKey.js";
import { WheaterApi } from "./weather-api.js";

const convertCityToHTML = (city) => {
	return `
		<section>

			<h1 id="main_weather">${city.wheater.description}</h1>

			<div>
				<span id="temp">Temp: ${city.wheater.temp}ºC</span>
				<span id="feels_like">Feels like; ${city.wheater.feels_like}ºC</span>
				<span id="temp_min">Temp min: ${city.wheater.temp_min}ºC</span>
				<span id="temp_max">Temp max: ${city.wheater.temp_max}ºC</span>
			</div>

		</section>
	`;
};

const GetCityWeather = async (city_name) => {
	WheaterApi.search(city_name, WEATHER_API_KEY, PEXELS_API_KEY)
		.then((city) => {
			document.body.style.backgroundImage = `url('${city.img_url}')`;
			document.getElementsByTagName('main')[0].innerHTML = convertCityToHTML (city);
		}
	);
}

// Input
let timer;
const waitTime = 750; // wait time for make HTTP Request when user stop typing
document.getElementsByTagName('input')[0].addEventListener('keyup', (e) => {

	let city_name = e.currentTarget.value;

	// Clear timer
	clearTimeout(timer);

	// Wait for ${waitTime}, then process the request
	timer = setTimeout(() => {
		GetCityWeather(city_name);
	}, waitTime);
})

// Initial city
GetCityWeather('London');
