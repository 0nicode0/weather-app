import { City } from "./city-model.js";

export const WheaterApi = {

	async search(city_name, WEATHER_API_KEY, PEXELS_API_KEY) {

		let city = new City();
		city.name = city_name;

		// Get latitude and lontitude of city by name
		await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${WEATHER_API_KEY}`)
			.then((response) => response.json())
			.then((data) => {
				city.coords.lat = data[0].lat;
				city.coords.lon = data[0].lon;
			})
			.catch(err => console.log("Get Latitude and lontide request error: " + err));

		// Get weather info from latitude and lontitude
		await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${WEATHER_API_KEY}&units=metric`)
			.then((response) => response.json())
			.then((data) => {
				city.wheater.temp = data.main.temp;
				city.wheater.feels_like = data.main.feels_like;
				city.wheater.temp_min = data.main.temp_min;
				city.wheater.temp_max = data.main.temp_max;
				city.wheater.description = data.weather[0].description;
			})
			.catch(err => console.log("Get weather request error: " + err));

		// Get city image and photographer info
		const total_phtotos_search = 15; // Max 80
		const random_photo = Math.floor(Math.random() * total_phtotos_search);
		await fetch(`https://api.pexels.com/v1/search?query=${city.name} ${city.wheater.description}&per_page=${total_phtotos_search}`, {
			method: 'GET',
			headers: { 
				Accept: 'application/json',
				Authorization: PEXELS_API_KEY
			}
		})
		.then((response) => response.json())
		.then((data) => {
			city.img_url = data.photos[random_photo].src.large2x;
			city.photographer.name = data.photos[random_photo].photographer;
			city.photographer.url = data.photos[random_photo].photographer_url;
		})
		.catch(err => console.log("Get photo request error: " + err));

		return city;
	}
};


