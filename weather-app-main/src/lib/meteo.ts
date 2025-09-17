import { fetchWeatherApi } from 'openmeteo';

const params = {
	"latitude": 52.52,
	"longitude": 13.41,
	"hourly": ["temperature_2m", "relativehumidity_2m", "apparent_temperature", "precipitation", "weathercode", "windspeed_10m", "uv_index"],
    "daily": ["sunrise", "sunset"],
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const hourly = response.hourly()!;
const daily = response.daily()!;

// Extract sunrise and sunset variables from daily
const sunrise = daily.variables(0)!;
const sunset = daily.variables(1)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
export const weatherData = {
	hourly: {
		time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
        relativehumidity_2m: hourly.variables(1)!.valuesArray(),
        apparent_temperature: hourly.variables(2)!.valuesArray(),
        precipitation: hourly.variables(3)!.valuesArray(),
        weathercode: hourly.variables(4)!.valuesArray(),
        windspeed_10m: hourly.variables(5)!.valuesArray(),
        uv_index: hourly.variables(6)!.valuesArray(),
	},
    daily: {
        time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
            (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
        ),
        // Map Int64 values to according structure
		sunrise: [...Array(sunrise.valuesInt64Length())].map(
			(_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunset: [...Array(sunset.valuesInt64Length())].map(
			(_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
    }
};

// 'weatherData' now contains a simple structure with arrays with datetime and weather data
console.log("\nHourly data", weatherData.hourly)