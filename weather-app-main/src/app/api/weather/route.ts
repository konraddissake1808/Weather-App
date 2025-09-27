import { fetchWeatherApi } from 'openmeteo';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

	const { searchParams } = new URL(req.url);
	const lat = searchParams.get('lat') || '52.52';
	const lon = searchParams.get('lon') || '13.4050';

	if (!lat || !lon) {
    	return NextResponse.json({ error: "Missing latitude or longitude" }, { status: 400 });
  	}

	const params = {
		"latitude": parseFloat(lat),
		"longitude": parseFloat(lon),
		"hourly": ["temperature_2m", "relativehumidity_2m", "apparent_temperature", "precipitation", "weathercode", "windspeed_10m", "uv_index"],
		"daily": ["sunrise", "sunset", "weather_code", "temperature_2m_max", "temperature_2m_min"],
		"timezone": "auto",
	};
	const url = "https://api.open-meteo.com/v1/forecast";
	const responses = await fetchWeatherApi(url, params);

	// Process first location. Add a for-loop for multiple locations or weather models
	const response = responses[0];

	// Attributes for timezone and location
	const latitude = response.latitude();
	const longitude = response.longitude();
	const elevation = response.elevation();
	const timezone = response.timezone();
	const timezoneAbbreviation = response.timezoneAbbreviation();
	const utcOffsetSeconds = response.utcOffsetSeconds();

	console.log(
		`\nCoordinates: ${latitude}°N ${longitude}°E`,
		`\nElevation: ${elevation}m asl`,
		`\nTimezone: ${timezone}`,
		`\nTimezone abbreviation: ${timezoneAbbreviation}`,
		`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
	);

	const hourly = response.hourly()!;
	const daily = response.daily()!;

	// Extract sunrise and sunset variables from daily
	const sunrise = daily.variables(0)!;
	const sunset = daily.variables(1)!;

	// Note: The order of weather variables in the URL query and the indices below need to match!
	const weatherData = {
		location: {
			latitude,
			longitude,
			elevation,
			timezone,
			timezoneAbbreviation,
			utcOffsetSeconds,
		},
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
			weather_code: daily.variables(2)!.valuesArray(),
			temperature_2m_max: daily.variables(3)!.valuesArray(),
			temperature_2m_min: daily.variables(4)!.valuesArray(),
		}
	};

	return NextResponse.json(weatherData);
}