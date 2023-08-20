export class City {
	name;
	img_url;
	coords = {
		lat: 0,
		lon: 0
	};
	wheater = {
		temp: 0,
		feels_like: 0,
		temp_min: 0,
		temp_max: 0,
		description: '',
		pressure: 0,
		humidity: 0,
		sea_level: 0,
		grnd_level: 0,
		
		wind: {
			speed: 0,
			deg: 0,
			gust: 0
		}
	};
	photographer = {
		name: '',
		url: ''
	};
}

