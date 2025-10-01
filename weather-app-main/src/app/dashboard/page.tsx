'use client';
import React, { useEffect } from 'react'
import Image from 'next/image'
import TodayCard from '../../components/todayCard/TodayCard';
import SearchBar from '../../components/searchBar/SearchBar';
import { getUserLocation } from '@/utils/geolocation';
import SearchButton from '@/components/searchButton/SearchButton';
import OtherDataCard from '@/components/todayWeatherOtherDataCard/OtherDataCard';

/*interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export const defaultCity: City = {"name": "Berlin", "latitude": 52.52, "longitude": 13.4050};*/

export default function Dashboard() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weatherData, setWeatherData] = React.useState<any>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const {latitude, longitude} = await getUserLocation();
        console.log("User location:", latitude, longitude);
        // Fetch weather data for user's location
        //const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
        // Fallback to default city if user denies location access
        const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`); 
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  console.log(weatherData);
  //date
  // Fallback values if weatherData is not yet loaded
  const date = weatherData && weatherData.hourly && weatherData.hourly.time && weatherData.hourly.time.length > 0
    ? new Date(weatherData.hourly.time[0]).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
    : 'Loading date...';

  const getCurrentHourIndex = () => {
    if (!weatherData || !weatherData.hourly || !weatherData.hourly.time) return 0;
    const now = new Date();
    // Convert now to the location's timezone
    const tz = weatherData.location.timezone;
    const nowTz = new Date(now.toLocaleString('en-US', { timeZone: tz }));
    // Find the closest hour in the array
    return weatherData.hourly.time.findIndex((t: string | Date) => {
      const hour = new Date(t).getHours();
      return hour === nowTz.getHours();
    });
  };
  const currentHourIndex = getCurrentHourIndex();
  //temperature
  const temperature = weatherData
    ? Math.round(weatherData.hourly.temperature_2m[currentHourIndex])
    : 0;
  //city
  const city = weatherData ? weatherData.location.timezone.split('/')[1].replace('_', ' ') : 'Loading city...';
  //feels like
  const feelsLike = weatherData
    ? Math.round(weatherData.hourly.apparent_temperature[currentHourIndex])
    : 0;
  //humidity
  const humidity = weatherData
    ? Math.round(weatherData.hourly.relativehumidity_2m[currentHourIndex])
    : 0; 
  //wind
  const wind = weatherData
    ? Math.round(weatherData.hourly.windspeed_10m[currentHourIndex])
    : 0;
  //precipitation
  const precipitation = weatherData
    ? Math.round(weatherData.hourly.precipitation[currentHourIndex] * 100) / 100 // round to 2 decimal places
    : 0;
  
  //weather code
  const weatherCode = weatherData
    ? weatherData.hourly.weathercode[currentHourIndex]
    : 0;

  //daily forecast - first day
  const firstDay = weatherData && weatherData.daily && weatherData.daily.time && weatherData.daily.time.length > 0
    ? new Date(weatherData.daily.time[0]).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
    : 'Loading date...';
  
  const country = weatherData && weatherData.location && weatherData.location.country
    ? weatherData.location.country
    : '';

  const otherDataTitle = ['Feels Like', 'Humidity', 'Wind', 'Precipitation'];
  const otherDataUnitMetric = ["°", "%", "km/h", "mm"];
  const otherDataUnitImperial = ["°", "%", "mph", "in"];

  // You can toggle between metric and imperial units as needed
 /* const useMetric = true; // Change to false for imperial units
  const otherDataUnit = useMetric ? otherDataUnitMetric : otherDataUnitImperial;  */
  
  return (
    <div className="fex items-center justify-items-center w-full mt-4">
      <div className='w-full flex flex-col items-center'>
        <div>
          <div>
            <Image
              src="/logo.svg"
              alt="Weather App Logo"
              width={128}
              height={32}
              priority

              className='w-32 h-8'
            />
          </div>
        </div>
        <div className='w-[90%] flex flex-col items-center mt-12'>
          <h1 className='text-white text-5xl font-bold mt-8 font-bricolage-grotesque text-center text-balance'>How&apos;s the sky looking today?</h1>
        </div>
        <div className='w-[90%] flex flex-col items-center mt-12'>
          <SearchBar  />
          <SearchButton />
        </div>
        <div className="mt-8 w-full flex items-center justify-center">
          {weatherData ? (
            <TodayCard date={date} temperature={temperature} city={city} country={country} weatherCode={weatherCode} />
          ) : (
            <div className="text-white">Loading weather data...</div>
          )}
        </div>
        <div className='w-[90%] flex flex-col md:flex-row items-center justify-between mt-5 mb-8'>
          <div className='text-white text-2xl w-full font-semibold mb-4 md:mb-0 grid grid-cols-2 grid-rows-2 gap-4'>
            <div className='flex flex-col items-center w-full'>
              <OtherDataCard otherDataTitle={otherDataTitle[0]} otherData={feelsLike} otherDataUnitMetric={otherDataUnitMetric[0]} otherDataUnitImperial={otherDataUnitImperial[0]} />
            </div>
            <div>
              <OtherDataCard otherDataTitle={otherDataTitle[1]} otherData={humidity} otherDataUnitMetric={otherDataUnitMetric[1]} otherDataUnitImperial={otherDataUnitImperial[1]} />
            </div>
            <div>
              <OtherDataCard otherDataTitle={otherDataTitle[2]} otherData={wind} otherDataUnitMetric={otherDataUnitMetric[2]} otherDataUnitImperial={otherDataUnitImperial[2]} />
            </div>
            <div>
              <OtherDataCard otherDataTitle={otherDataTitle[3]} otherData={precipitation} otherDataUnitMetric={otherDataUnitMetric[3]} otherDataUnitImperial={otherDataUnitImperial[3]} />
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>Daily forecasts</p>
          </div>
          <div>
            <div>
              <div>
                <p>{firstDay}</p>
              </div>
              <div>
                
              </div>
              <div></div>
            </div>
          </div>
          <div>

          </div>
          <div>

          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
