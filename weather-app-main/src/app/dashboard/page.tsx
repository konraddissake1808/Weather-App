'use client';
import React, { useEffect } from 'react'
import Image from 'next/image'
import TodayCard from '../../components/TodayCard';
import SearchBar from '../../components/SearchBar';
import { getUserLocation } from '@/utils/geolocation';

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
  const temperature = weatherData
    ? Math.round(weatherData.hourly.temperature_2m[currentHourIndex])
    : 0;

  const city = weatherData ? weatherData.location.timezone.split('/')[1].replace('_', ' ') : 'Loading city...';

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
        <div className='w-[90%] flex flex-col items-center'>
          <h1 className='text-white text-5xl font-bold mt-8 font-bricolage-grotesque text-center text-balance'>How&apos;s the sky looking today?</h1>
        </div>
        <div>
          <SearchBar  />
        </div>
        <div className="mt-8 w-full flex items-center justify-center">
          {weatherData ? (
            <TodayCard date={date} temperature={temperature} city={city} />
          ) : (
            <div className="text-white">Loading weather data...</div>
          )}
        </div>
      </div>
    </div>
  )
}
