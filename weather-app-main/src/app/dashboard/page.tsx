'use client';
import React, { useEffect } from 'react'
import Image from 'next/image'
import TodayCard from '../../components/todayCard/TodayCard';
import SearchBar from '../../components/searchBar/SearchBar';
import { getUserLocation } from '@/utils/geolocation';
import SearchButton from '@/components/searchButton/SearchButton';
import OtherDataCard from '@/components/todayWeatherOtherDataCard/OtherDataCard';
import DailyForecastCard from '@/components/dailyForecastCard/DailyForecastCard';
import HourlyForecast from '@/components/hourlyForecastComponent.tsx/HourlyForecast';
import UnitDropdown from '@/components/unitDropdown/UnitDropdown';
import HourlyForecastDropdown from '@/components/hourlyForecastDropdown/HourlyForecastDropdown';

/*interface City {
  name: string;
  latitude: number;
  longitude: number;
}
  

export const defaultCity: City = {"name": "Berlin", "latitude": 52.52, "longitude": 13.4050};*/

export function changeForecastDay(days:string, index:number) {
  console.log(`${days} clicked at index ${index}`);
  const hourlyForecastDayButton = document.getElementById('dayButton');
  const hourlyForecastDayButtonText = hourlyForecastDayButton?.querySelector("#dayButtonText")
  if (hourlyForecastDayButtonText) {
    hourlyForecastDayButtonText.innerHTML = `${days}`;
  }
}

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
  //current temperature
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
    ? new Date(weatherData.daily.time[0]).toLocaleDateString('en-US', { weekday: 'long' })
    : 'Loading date...';
  //dayTwo
  const secondDay = weatherData && weatherData.daily && weatherData.daily.time && weatherData.daily.time.length > 1
    ? new Date(weatherData.daily.time[1]).toLocaleDateString('en-US', { weekday: 'long' })
    : 'Loading date...';
  //dayThree
  const thirdDay = weatherData && weatherData.daily && weatherData.daily.time && weatherData.daily.time.length > 2
    ? new Date(weatherData.daily.time[2]).toLocaleDateString('en-US', { weekday: 'long' })
    : 'Loading date...';
  //dayFour
  const fourthDay = weatherData && weatherData.daily && weatherData.daily.time && weatherData.daily.time.length > 3
    ? new Date(weatherData.daily.time[3]).toLocaleDateString('en-US', { weekday: 'long' })
    : 'Loading date...';
  //dayFive
  const fifthDay = weatherData && weatherData.daily && weatherData.daily.time && weatherData.daily.time.length > 4
    ? new Date(weatherData.daily.time[4]).toLocaleDateString('en-US', { weekday: 'long' })
    : 'Loading date...';
  //daySix
  const sixthDay = weatherData && weatherData.daily && weatherData.daily.time && weatherData.daily.time.length > 5
    ? new Date(weatherData.daily.time[5]).toLocaleDateString('en-US', { weekday: 'long' })
    : 'Loading date...';
  //daySeven
  const seventhDay = weatherData && weatherData.daily && weatherData.daily.time && weatherData.daily.time.length > 6
    ? new Date(weatherData.daily.time[6]).toLocaleDateString('en-US', { weekday: 'long' })
    : 'Loading date...';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const days: any[] = [];
  for(let x=0; x<7; x++) {
    const timeValues = weatherData ? new Date(weatherData.daily.time[x]).toLocaleDateString('en-US', { weekday: 'long' }) : "";
    days.push(timeValues);
  }
  console.log(days)
  
  //max temp
  const maxTempDayOne = weatherData
    ?Math.round(weatherData.daily.temperature_2m_max[0])
    : 0;
  const maxTempDayTwo = weatherData
    ? Math.round(weatherData.daily.temperature_2m_max[1])
    : 0;
  const maxTempDayThree = weatherData
    ? Math.round(weatherData.daily.temperature_2m_max[2])
    : 0;
  const maxTempDayFour = weatherData
    ? Math.round(weatherData.daily.temperature_2m_max[3])
    : 0;
  const maxTempDayFive = weatherData
    ? Math.round(weatherData.daily.temperature_2m_max[4])
    : 0;
  const maxTempDaySix = weatherData
    ? Math.round(weatherData.daily.temperature_2m_max[5])
    : 0;
  const maxTempDaySeven = weatherData
    ? Math.round(weatherData.daily.temperature_2m_max[6])
    : 0;
  
  //min temp
  const minTempDayOne = weatherData
    ? Math.round(weatherData.daily.temperature_2m_min[0])
    : 0;
  const minTempDayTwo = weatherData
    ? Math.round(weatherData.daily.temperature_2m_min[1])
    : 0;
  const minTempDayThree = weatherData
    ? Math.round(weatherData.daily.temperature_2m_min[2])
    : 0;
  const minTempDayFour = weatherData
    ? Math.round(weatherData.daily.temperature_2m_min[3])
    : 0;
  const minTempDayFive = weatherData
    ? Math.round(weatherData.daily.temperature_2m_min[4])
    : 0;
  const minTempDaySix = weatherData
    ? Math.round(weatherData.daily.temperature_2m_min[5])
    : 0;
  const minTempDaySeven = weatherData
    ? Math.round(weatherData.daily.temperature_2m_min[6])
    : 0;

  //daily weather code
  const weatherCodeDailyDayOne = weatherData
    ? weatherData.daily.weathercode[0]
    : 0;
  const weatherCodeDailyDayTwo = weatherData
    ? weatherData.daily.weathercode[1]
    : 0;
  const weatherCodeDailyDayThree = weatherData
    ? weatherData.daily.weathercode[2]
    : 0;
  const weatherCodeDailyDayFour = weatherData
    ? weatherData.daily.weathercode[3]
    : 0;
  const weatherCodeDailyDayFive = weatherData
    ? weatherData.daily.weathercode[4]
    : 0;
  const weatherCodeDailyDaySix = weatherData
    ? weatherData.daily.weathercode[5]
    : 0;
  const weatherCodeDailyDaySeven = weatherData
    ? weatherData.daily.weathercode[6]
    : 0;
  //Hourly forecast
  //Day One Temperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayOne: any[] = [];
  for(let x=0; x<25; x++) {
    const tempDayOne = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayOne.push(tempDayOne);
  }
  //Day One Weather code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyWeatherCodeDayOne: any[] = [];
  for(let x=0; x<24; x++) {
    const weatherCodeDayOne = weatherData? weatherData.hourly.weathercode[x]: 0;
    hourlyWeatherCodeDayOne.push(weatherCodeDayOne);
  }
  console.log(hourlyWeatherCodeDayOne);
  /*const hourlyForecastDayOne = weatherData
    ? weatherData.hourly.temperature_2m[0]
    : 0;*/

  //current country
  const country = weatherData && weatherData.location && weatherData.location.country
    ? weatherData.location.country
    : '';

  const otherDataTitle = ['Feels Like', 'Humidity', 'Wind', 'Precipitation'];
  const otherDataUnitMetric = ["°", "%", "km/h", "mm"];
  const otherDataUnitImperial = ["°", "%", "mph", "in"];

  const hours = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

  // You can toggle between metric and imperial units as needed
 /* const useMetric = true; // Change to false for imperial units
  const otherDataUnit = useMetric ? otherDataUnitMetric : otherDataUnitImperial;  */
  
  
  return (
    <div className="fex items-center justify-items-center w-full mt-4">
      <div className='w-full flex flex-col items-center'>
        <div className='w-[90%] flex items-center justify-between'>
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
          <div>
            <UnitDropdown />
          </div>
        </div>
        <div className='w-[90%] flex flex-col items-center mt-12'>
          <h1 className='text-white text-5xl font-bold font-bricolage-grotesque text-center text-balance'>How&apos;s the sky looking today?</h1>
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
          <div className='text-white text-2xl w-full font-semibold md:mb-0 grid grid-cols-2 grid-rows-2 gap-4'>
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
        <div className='w-[90%] flex flex-col items-center mb-5'>
          <div className='w-full mb-5 font-dm-sans font-semibold text-xl text-neutral-0 leading-5'>
            <p>Daily forecasts</p>
          </div>
          <div className='w-full'>
            <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4'>
              <div>
                <DailyForecastCard weatherCode={weatherCodeDailyDayOne} maxTemp={maxTempDayOne} minTemp={minTempDayOne} date={firstDay} />
              </div>
              <div>
                <DailyForecastCard weatherCode={weatherCodeDailyDayTwo} maxTemp={maxTempDayTwo} minTemp={minTempDayTwo} date={secondDay} />
              </div>
              <div>
                <DailyForecastCard weatherCode={weatherCodeDailyDayThree} maxTemp={maxTempDayThree} minTemp={minTempDayThree} date={thirdDay} />
              </div>
              <div>
                <DailyForecastCard weatherCode={weatherCodeDailyDayFour} maxTemp={maxTempDayFour} minTemp={minTempDayFour} date={fourthDay} />
              </div>
              <div>
                <DailyForecastCard weatherCode={weatherCodeDailyDayFive} maxTemp={maxTempDayFive} minTemp={minTempDayFive} date={fifthDay} />
              </div>
              <div>
                <DailyForecastCard weatherCode={weatherCodeDailyDaySix} maxTemp={maxTempDaySix} minTemp={minTempDaySix} date={sixthDay} />
              </div>
              <div>
                <DailyForecastCard weatherCode={weatherCodeDailyDaySeven} maxTemp={maxTempDaySeven} minTemp={minTempDaySeven} date={seventhDay} />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col items-center'>
          <div className='w-[90%] bg-neutral-800 rounded-lg px-5 py-0 pt-5 h-[685px] overflow-scroll'>
            <div className='flex items-center justify-between mb-5'>
              <div className='font-dm-sans font-semibold text-xl text-neutral-0 leading-5'>
                <p>Hourly Forecast</p>
              </div>
              <div>
                <HourlyForecastDropdown firstDay={firstDay} secondDay={secondDay} thirdDay={thirdDay} fourthDay={fourthDay} fithDay={fifthDay} sixthDay={sixthDay} seventhDay={seventhDay} />
              </div>
            </div>
            <div className='overflow-y-scroll h-[595px] snap-y'>
              <div className='snap-start'>
                <div className=''>
                  <HourlyForecast hour={hours[0]} hourlyWeatherCode={hourlyWeatherCodeDayOne[0]} hourlyTemperature={hourlyTempDayOne[0]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[1]} hourlyWeatherCode={hourlyWeatherCodeDayOne[1]} hourlyTemperature={hourlyTempDayOne[1]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[2]} hourlyWeatherCode={hourlyWeatherCodeDayOne[2]} hourlyTemperature={hourlyTempDayOne[2]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[3]} hourlyWeatherCode={hourlyWeatherCodeDayOne[3]} hourlyTemperature={hourlyTempDayOne[3]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[4]} hourlyWeatherCode={hourlyWeatherCodeDayOne[4]} hourlyTemperature={hourlyTempDayOne[4]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[5]} hourlyWeatherCode={hourlyWeatherCodeDayOne[5]} hourlyTemperature={hourlyTempDayOne[5]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[6]} hourlyWeatherCode={hourlyWeatherCodeDayOne[6]} hourlyTemperature={hourlyTempDayOne[6]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[7]} hourlyWeatherCode={hourlyWeatherCodeDayOne[7]} hourlyTemperature={hourlyTempDayOne[7]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[8]} hourlyWeatherCode={hourlyWeatherCodeDayOne[8]} hourlyTemperature={hourlyTempDayOne[8]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[9]} hourlyWeatherCode={hourlyWeatherCodeDayOne[9]} hourlyTemperature={hourlyTempDayOne[9]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[10]} hourlyWeatherCode={hourlyWeatherCodeDayOne[10]} hourlyTemperature={hourlyTempDayOne[10]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[11]} hourlyWeatherCode={hourlyWeatherCodeDayOne[11]} hourlyTemperature={hourlyTempDayOne[11]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[12]} hourlyWeatherCode={hourlyWeatherCodeDayOne[12]} hourlyTemperature={hourlyTempDayOne[12]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[13]} hourlyWeatherCode={hourlyWeatherCodeDayOne[13]} hourlyTemperature={hourlyTempDayOne[13]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[14]} hourlyWeatherCode={hourlyWeatherCodeDayOne[14]} hourlyTemperature={hourlyTempDayOne[14]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[15]} hourlyWeatherCode={hourlyWeatherCodeDayOne[15]} hourlyTemperature={hourlyTempDayOne[15]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[16]} hourlyWeatherCode={hourlyWeatherCodeDayOne[16]} hourlyTemperature={hourlyTempDayOne[16]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[17]} hourlyWeatherCode={hourlyWeatherCodeDayOne[17]} hourlyTemperature={hourlyTempDayOne[17]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[18]} hourlyWeatherCode={hourlyWeatherCodeDayOne[18]} hourlyTemperature={hourlyTempDayOne[18]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[19]} hourlyWeatherCode={hourlyWeatherCodeDayOne[19]} hourlyTemperature={hourlyTempDayOne[19]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[20]} hourlyWeatherCode={hourlyWeatherCodeDayOne[20]} hourlyTemperature={hourlyTempDayOne[20]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[21]} hourlyWeatherCode={hourlyWeatherCodeDayOne[21]} hourlyTemperature={hourlyTempDayOne[21]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[22]} hourlyWeatherCode={hourlyWeatherCodeDayOne[22]} hourlyTemperature={hourlyTempDayOne[22]} />
                </div>
                <div className='snap-start'>
                  <HourlyForecast hour={hours[23]} hourlyWeatherCode={hourlyWeatherCodeDayOne[23]} hourlyTemperature={hourlyTempDayOne[23]} />
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
