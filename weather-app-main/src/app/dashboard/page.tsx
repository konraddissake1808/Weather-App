'use client';
import React, { useEffect, useState } from 'react'
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
  //Day Two Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayTwo: any[] = [];
  for(let x=25; x<48; x++) {
    const tempDayTwo = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayTwo.push(tempDayTwo);
  }
  //Day Three Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayThree: any[] = [];
  for(let x=48; x<72; x++) {
    const tempDayThree = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayThree.push(tempDayThree);
  }
  //Day Four Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayFour: any[] = [];
  for(let x=72; x<96; x++) {
    const tempDayFour = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayFour.push(tempDayFour);
  }
  //Day Five Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayFive: any[] = [];
  for(let x=96; x<120; x++) {
    const tempDayFive = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayFive.push(tempDayFive);
  }
  //Day Six Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDaySix: any[] = [];
  for(let x=120; x<144; x++) {
    const tempDaySix = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDaySix.push(tempDaySix);
  }
  //Day Seven Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDaySeven: any[] = [];
  for(let x=144; x<168; x++) {
    const tempDaySeven = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDaySeven.push(tempDaySeven);
  }

  //Day One Weather code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyWeatherCodeDayOne: any[] = [];
  for(let x=0; x<24; x++) {
    const weatherCodeDayOne = weatherData? weatherData.hourly.weathercode[x]: 0;
    hourlyWeatherCodeDayOne.push(weatherCodeDayOne);
  }
  //Day Two Weather code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyWeatherCodeDayTwo: any[] = [];
  for(let x=24; x<48; x++) {
    const weatherCodeDayTwo = weatherData? weatherData.hourly.weathercode[x]: 0;
    hourlyWeatherCodeDayTwo.push(weatherCodeDayTwo);
  }
  //Day Three Weather code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyWeatherCodeDayThree: any[] = [];
  for(let x=48; x<72; x++) {
    const weatherCodeDayThree = weatherData? weatherData.hourly.weathercode[x]: 0;
    hourlyWeatherCodeDayThree.push(weatherCodeDayThree);
  }
  //Day Four Weather code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyWeatherCodeDayFour: any[] = [];
  for(let x=72; x<96; x++) {
    const weatherCodeDayFour = weatherData? weatherData.hourly.weathercode[x]: 0;
    hourlyWeatherCodeDayFour.push(weatherCodeDayFour);
  }
  //Day Five Weather code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyWeatherCodeDayFive: any[] = [];
  for(let x=96; x<120; x++) {
    const weatherCodeDayFive = weatherData? weatherData.hourly.weathercode[x]: 0;
    hourlyWeatherCodeDayFive.push(weatherCodeDayFive);
  }
  //Day Six Weather code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyWeatherCodeDaySix: any[] = [];
  for(let x=120; x<144; x++) {
    const weatherCodeDaySix = weatherData? weatherData.hourly.weathercode[x]: 0;
    hourlyWeatherCodeDaySix.push(weatherCodeDaySix);
  }
  //Day Seven Weather code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyWeatherCodeDaySeven: any[] = [];
  for(let x=144; x<168; x++) {
    const weatherCodeDaySeven = weatherData? weatherData.hourly.weathercode[x]: 0;
    hourlyWeatherCodeDaySeven.push(weatherCodeDaySeven);
  }

  const [hourlyTemps, setHourlyTemps] = useState<number[]>(hourlyTempDayOne);
  const [hourlyWeatherCodes, setHourlyWeatherCodes] = useState<number[]>(hourlyWeatherCodeDayOne);
  useEffect(() => {
    if (weatherData) {
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
      
      setHourlyTemps(hourlyTempDayOne);
      setHourlyWeatherCodes(hourlyWeatherCodeDayOne);
    }
  }, [weatherData, currentHourIndex]);

  //current country
  const country = weatherData && weatherData.location && weatherData.location.country
    ? weatherData.location.country
    : '';

  const otherDataTitle = ['Feels Like', 'Humidity', 'Wind', 'Precipitation'];
  const otherDataUnitMetric = ["°", "%", " km/h", " mm"];
  const otherDataUnitImperial = ["°", "%", " mph", " in"];

  const hours = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

  function changeForecastDay(days:string, index:number) {
    console.log(`${days} clicked at index ${index}`);
    const hourlyForecastDayButton = document.getElementById('dayButton');
    const hourlyForecastDropdownButton1 = document.getElementById('hourlyForecastButton0');
    const hourlyForecastDropdownButton2 = document.getElementById('hourlyForecastButton1');
    const hourlyForecastDropdownButton3 = document.getElementById('hourlyForecastButton2');
    const hourlyForecastDropdownButton4 = document.getElementById('hourlyForecastButton3');
    const hourlyForecastDropdownButton5 = document.getElementById('hourlyForecastButton4');
    const hourlyForecastDropdownButton6 = document.getElementById('hourlyForecastButton5');
    const hourlyForecastDropdownButton7 = document.getElementById('hourlyForecastButton6');
    const hourlyForecastDayButtonText = hourlyForecastDayButton?.querySelector("#dayButtonText");
    if (hourlyForecastDayButtonText) {
      hourlyForecastDayButtonText.innerHTML = `${days}`;
    }
    if (index === 0) {
      setHourlyTemps(hourlyTempDayOne);
      setHourlyWeatherCodes(hourlyWeatherCodeDayOne);
      hourlyForecastDropdownButton1?.classList.remove('bg-neutral-800');
      hourlyForecastDropdownButton1?.classList.add('bg-neutral-700');
      hourlyForecastDropdownButton2?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton3?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton4?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton5?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton6?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton7?.classList.remove('bg-neutral-700');
    }
    else if (index === 1) {
      setHourlyTemps(hourlyTempDayTwo);
      setHourlyWeatherCodes(hourlyWeatherCodeDayTwo)
      hourlyForecastDropdownButton2?.classList.remove('bg-neutral-800');
      hourlyForecastDropdownButton2?.classList.add('bg-neutral-700');
      hourlyForecastDropdownButton1?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton3?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton4?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton5?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton6?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton7?.classList.remove('bg-neutral-700');
    }
    else if (index === 2) {
      setHourlyTemps(hourlyTempDayThree);
      setHourlyWeatherCodes(hourlyWeatherCodeDayThree)
      hourlyForecastDropdownButton3?.classList.remove('bg-neutral-800');
      hourlyForecastDropdownButton3?.classList.add('bg-neutral-700');
      hourlyForecastDropdownButton1?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton2?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton4?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton5?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton6?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton7?.classList.remove('bg-neutral-700');
    }
    else if (index === 3) {
      setHourlyTemps(hourlyTempDayFour);
      setHourlyWeatherCodes(hourlyWeatherCodeDayFour)
      hourlyForecastDropdownButton4?.classList.remove('bg-neutral-800');
      hourlyForecastDropdownButton4?.classList.add('bg-neutral-700');
      hourlyForecastDropdownButton1?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton2?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton3?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton5?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton6?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton7?.classList.remove('bg-neutral-700');
    }
    else if (index === 4) {
      setHourlyTemps(hourlyTempDayFive);
      setHourlyWeatherCodes(hourlyWeatherCodeDayFive)
      hourlyForecastDropdownButton5?.classList.remove('bg-neutral-800');
      hourlyForecastDropdownButton5?.classList.add('bg-neutral-700');
      hourlyForecastDropdownButton1?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton2?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton3?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton4?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton6?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton7?.classList.remove('bg-neutral-700');
    }
    else if (index === 5) {
      setHourlyTemps(hourlyTempDaySix);
      setHourlyWeatherCodes(hourlyWeatherCodeDaySix)
      hourlyForecastDropdownButton6?.classList.remove('bg-neutral-800');
      hourlyForecastDropdownButton6?.classList.add('bg-neutral-700');
      hourlyForecastDropdownButton1?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton2?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton3?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton4?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton5?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton7?.classList.remove('bg-neutral-700');
    }
    else if (index === 6) {
      setHourlyTemps(hourlyTempDaySeven);
      setHourlyWeatherCodes(hourlyWeatherCodeDaySeven)
      hourlyForecastDropdownButton7?.classList.remove('bg-neutral-800');
      hourlyForecastDropdownButton7?.classList.add('bg-neutral-700');
      hourlyForecastDropdownButton1?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton2?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton3?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton4?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton5?.classList.remove('bg-neutral-700');
      hourlyForecastDropdownButton6?.classList.remove('bg-neutral-700');
    }
  }

  // You can toggle between metric and imperial units as needed
  const [isMetric, setisMetric] = useState(true);
  const [nextUnit, setNextUnit] = useState("Imperial");
  const [dataUnit, setDataUnit] = useState(otherDataUnitMetric)
  const [currentTemperature, setCurrentTemperature] = useState(temperature);
  const [feelsLikeTemperature, setFeelsLikeTemperature] = useState(feelsLike);
  const [windSpeed, setWindSpeed] = useState(wind);
  const [precipitationValue, setPrecipitationVaue] = useState(precipitation)

  useEffect(() => {
    if(weatherData) {
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

      //initialize current temperature
      const initialCurrentTemp = weatherData
      ? Math.round(weatherData.hourly.temperature_2m[currentHourIndex])
      : 0;

      //initialize feels like temperature
      const initialFeelslikeTemp = weatherData
      ? Math.round(weatherData.hourly.apparent_temperature[currentHourIndex])
      : 0;

      //initialize wind speed
      const initialWindSpeed = weatherData
    ? Math.round(weatherData.hourly.windspeed_10m[currentHourIndex])
    : 0;

      //initialize precipitation
      const initialPrecipitation = weatherData
    ? Math.round(weatherData.hourly.precipitation[currentHourIndex] * 100) / 100 // round to 2 decimal places
    : 0;

      setCurrentTemperature(initialCurrentTemp);
      setFeelsLikeTemperature(initialFeelslikeTemp);
      setWindSpeed(initialWindSpeed);
      setPrecipitationVaue(initialPrecipitation);
    }
  },[weatherData])

  const switchToImperial = () => {
    if (isMetric === true) {
      setisMetric(false);
      console.log(isMetric);
      setNextUnit("Metric");
      setDataUnit(otherDataUnitImperial)
      setCurrentTemperature(Math.round(temperature * 9/5) + 32);
      setFeelsLikeTemperature(Math.round(feelsLike * 9/5) + 32);
      setWindSpeed(Math.round(wind * 0.621371));
      setPrecipitationVaue(Math.round(precipitation / 25.4 * 100) / 100);
    } else if (isMetric === false) {
      setisMetric(true);
      console.log(isMetric);
      setNextUnit("Imperial");
      setCurrentTemperature(temperature);
      setFeelsLikeTemperature(feelsLike);
      setWindSpeed(wind);
      setPrecipitationVaue(precipitation);
      setDataUnit(otherDataUnitMetric)
    }
  }
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
            <UnitDropdown switchToImperial={switchToImperial} nextUnit={nextUnit} />
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
            <TodayCard date={date} temperature={currentTemperature} city={city} country={country} weatherCode={weatherCode} />
          ) : (
            <div className="text-white">Loading weather data...</div>
          )}
        </div>
        <div className='w-[90%] flex flex-col md:flex-row items-center justify-between mt-5 mb-8'>
          <div className='text-white text-2xl w-full font-semibold md:mb-0 grid grid-cols-2 grid-rows-2 gap-4'>
            <div className='flex flex-col items-center w-full'>
              <OtherDataCard otherDataTitle={otherDataTitle[0]} otherData={feelsLikeTemperature} otherDataUnit={dataUnit[0]} />
            </div>
            <div>
              <OtherDataCard otherDataTitle={otherDataTitle[1]} otherData={humidity} otherDataUnit={dataUnit[1]} />
            </div>
            <div>
              <OtherDataCard otherDataTitle={otherDataTitle[2]} otherData={windSpeed} otherDataUnit={dataUnit[2]} />
            </div>
            <div>
              <OtherDataCard otherDataTitle={otherDataTitle[3]} otherData={precipitationValue} otherDataUnit={dataUnit[3]} />
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
        <div className='w-full flex flex-col items-center mb-5'>
          <div className='w-[90%] bg-neutral-800 rounded-lg px-5 py-0 pt-5 h-[685px] overflow-scroll'>
            <div className='flex items-center justify-between mb-5'>
              <div className='font-dm-sans font-semibold text-xl text-neutral-0 leading-5'>
                <p>Hourly Forecast</p>
              </div>
              <div>
                <HourlyForecastDropdown buttonClick={changeForecastDay} firstDay={firstDay} secondDay={secondDay} thirdDay={thirdDay} fourthDay={fourthDay} fithDay={fifthDay} sixthDay={sixthDay} seventhDay={seventhDay} />
              </div>
            </div>
            <div className='overflow-y-scroll h-[595px] snap-y'>
              <div className='snap-start'>
                {hours.map((hourLabel, index) => (
                  <div key={index}>
                    <div className='snap-start'>
                      <HourlyForecast hour={hourLabel} hourlyWeatherCode={hourlyWeatherCodes[index]} hourlyTemperature={hourlyTemps[index]} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
