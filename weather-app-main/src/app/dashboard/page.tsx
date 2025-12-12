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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maxTemps: any[] = [];
  for(let i = 0; i < 7; i++) {
    const maxTempValue = weatherData
    ?Math.round(weatherData.daily.temperature_2m_max[i])
    : 0;
    maxTemps.push(maxTempValue);
  }

  //min temp
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const minTemps: any[] = [];
  for(let i = 0; i < 7; i++) {
    const minTempValue = weatherData
    ?Math.round(weatherData.daily.temperature_2m_min[i])
    : 0;
    minTemps.push(minTempValue);
  }

  //daily weather code
  const dailyWeatherCodes = [];
  for(let i = 0; i < 7; i++) {
    const dailyWeatherCodesValues = weatherData
    ? weatherData.daily.weathercode[i]
    : 0;
    dailyWeatherCodes.push(dailyWeatherCodesValues);
  }

  //Hourly forecast
  //Day One Temperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayOne: any[] = [];
  for(let x=0; x<25; x++) {
    const tempDayOne = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayOne.push(tempDayOne);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayOneImperial: any[] = [];
  for(let x=0; x<25; x++) {
    const initTempDayOne = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    const initTempDayOneImp = Math.round((initTempDayOne * 9/5) + 32)
    hourlyTempDayOneImperial.push(initTempDayOneImp);
  }
  //Day Two Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayTwo: any[] = [];
  for(let x=25; x<48; x++) {
    const tempDayTwo = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayTwo.push(tempDayTwo);
  }

  console.log(hourlyTempDayTwo)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayTwoImperial: any[] = [];
  for(let x=25; x<48; x++) {
    const initTempDayTwo = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    const initTempDayTwoImp = Math.round((initTempDayTwo * 9/5) + 32)
    hourlyTempDayTwoImperial.push(initTempDayTwoImp);
  }
  //Day Three Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayThree: any[] = [];
  for(let x=48; x<72; x++) {
    const tempDayThree = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayThree.push(tempDayThree);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayThreeImperial: any[] = [];
  for(let x=48; x<72; x++) {
    const initTempDayThree = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    const initTempDayThreeImp = Math.round((initTempDayThree * 9/5) + 32)
    hourlyTempDayThreeImperial.push(initTempDayThreeImp);
  }
  //Day Four Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayFour: any[] = [];
  for(let x=72; x<96; x++) {
    const tempDayFour = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayFour.push(tempDayFour);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayFourImperial: any[] = [];
  for(let x=72; x<96; x++) {
    const initTempDayFour = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    const initTempDayFourImp = Math.round((initTempDayFour * 9/5) + 32)
    hourlyTempDayFourImperial.push(initTempDayFourImp);
  }
  //Day Five Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayFive: any[] = [];
  for(let x=96; x<120; x++) {
    const tempDayFive = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDayFive.push(tempDayFive);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDayFiveImperial: any[] = [];
  for(let x=96; x<120; x++) {
    const initTempDayFive = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    const initTempDayFiveImp = Math.round((initTempDayFive * 9/5) + 32)
    hourlyTempDayFiveImperial.push(initTempDayFiveImp);
  }
  //Day Six Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDaySix: any[] = [];
  for(let x=120; x<144; x++) {
    const tempDaySix = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDaySix.push(tempDaySix);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDaySixImperial: any[] = [];
  for(let x=120; x<144; x++) {
    const initTempDaySix = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    const initTempDaySixImp = Math.round((initTempDaySix * 9/5) + 32)
    hourlyTempDaySixImperial.push(initTempDaySixImp);
  }
  //Day Seven Tempemperature
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDaySeven: any[] = [];
  for(let x=144; x<168; x++) {
    const tempDaySeven = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    hourlyTempDaySeven.push(tempDaySeven);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourlyTempDaySevenImperial: any[] = [];
  for(let x=144; x<168; x++) {
    const initTempDaySeven = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
    const initTempDaySevenImp = Math.round((initTempDaySeven * 9/5) + 32)
    hourlyTempDaySevenImperial.push(initTempDaySevenImp);
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

  const [hourlyTemps, setHourlyTemps] = useState<number[]>([0]);
  const [hourlyWeatherCodes, setHourlyWeatherCodes] = useState<number[]>(hourlyWeatherCodeDayOne);
  const [hourlyTemperatureDayOne, setHourlyTemperatureDayOne] = useState([0]);
  const [hourlyTemperatureDayTwo, setHourlyTemperatureDayTwo] = useState([0]);
  const [hourlyTemperatureDayThree, setHourlyTemperatureDayThree] = useState([0]);
  const [hourlyTemperatureDayFour, setHourlyTemperatureDayFour] = useState([0]);
  const [hourlyTemperatureDayFive, setHourlyTemperatureDayFive] = useState([0]);
  const [hourlyTemperatureDaySix, setHourlyTemperatureDaySix] = useState([0]);
  const [hourlyTemperatureDaySeven, setHourlyTemperatureDaySeven] = useState([0]);

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
      
      setHourlyTemperatureDayOne(hourlyTempDayOne)
      setHourlyTemperatureDayTwo(hourlyTempDayTwo)
      setHourlyTemperatureDayThree(hourlyTempDayThree)
      setHourlyTemperatureDayFour(hourlyTempDayFour)
      setHourlyTemperatureDayFive(hourlyTempDayFive)
      setHourlyTemperatureDaySix(hourlyTempDaySix)
      setHourlyTemperatureDaySeven(hourlyTempDaySeven)
      setHourlyWeatherCodes(hourlyWeatherCodeDayOne);
    }
    
  }, [weatherData, currentHourIndex]);
  
  useEffect(() => {
    for(let i = 0; i < 1; i++) {
      setHourlyTemps(hourlyTemperatureDayOne)
    }
  }, [hourlyTemperatureDayOne])
  
  

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
      setHourlyTemps(hourlyTemperatureDayTwo);
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
      setHourlyTemps(hourlyTemperatureDayTwo);
      setHourlyWeatherCodes(hourlyWeatherCodeDayTwo)
      console.log(hourlyTemperatureDayTwo);
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
      setHourlyTemps(hourlyTemperatureDayThree);
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
      setHourlyTemps(hourlyTemperatureDayFour);
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
      setHourlyTemps(hourlyTemperatureDayFive);
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
      setHourlyTemps(hourlyTemperatureDaySix);
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
      setHourlyTemps(hourlyTemperatureDaySeven);
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
  const [precipitationValue, setPrecipitationVaue] = useState(precipitation);
  const [maximumTemperatureValues, setMaximumTemperatureValues] = useState([0]);
  const [minimumTemperatureValues, setMinimumTemperatureValues] = useState([0]);
  const [windUnit, setWindUnit] = useState(" km/h")
  const [precipitationUnit, setPrecipitationUnit] = useState(" mm")

  
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

      //initialize maximum teperatures
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initialMaxTemps:any[] = [];
      for(let i = 0; i < 7; i++) {
        const maximumTempValue = weatherData
        ?Math.round(weatherData.daily.temperature_2m_max[i])
        : 0;
        initialMaxTemps.push(maximumTempValue);
      }
      

      //min temp
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initialMinTemps: any[] = [];
      for(let i = 0; i < 7; i++) {
        const minimumTempValue = weatherData
        ?Math.round(weatherData.daily.temperature_2m_min[i])
        : 0;
        initialMinTemps.push(minimumTempValue);
      }
      //Hourly forecast
      //Day One Temperature
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initHourlyTempDayOneImperial: any[] = [];
      for(let x=0; x<25; x++) {
        const initTempDayOne = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
        const initTempDayOneImp = Math.round((initTempDayOne * 9/5) + 32)
        initHourlyTempDayOneImperial.push(initTempDayOneImp);
      }
      //Day Two Tempemperature
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initHourlyTempDayTwo: any[] = [];
      for(let x=25; x<48; x++) {
        const initTempDayTwo = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
        initHourlyTempDayTwo.push(initTempDayTwo);
      }
      //Day Three Tempemperature
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initHourlyTempDayThree: any[] = [];
      for(let x=48; x<72; x++) {
        const initTempDayThree = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
        initHourlyTempDayThree.push(initTempDayThree);
      }
      //Day Four Tempemperature
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initHourlyTempDayFour: any[] = [];
      for(let x=72; x<96; x++) {
        const initTempDayFour = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
        initHourlyTempDayFour.push(initTempDayFour);
      }
      //Day Five Tempemperature
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initHourlyTempDayFive: any[] = [];
      for(let x=96; x<120; x++) {
        const initTempDayFive = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
        initHourlyTempDayFive.push(initTempDayFive);
      }
      //Day Six Tempemperature
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initHourlyTempDaySix: any[] = [];
      for(let x=120; x<144; x++) {
        const initTempDaySix = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
        initHourlyTempDaySix.push(initTempDaySix);
      }
      //Day Seven Tempemperature
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initHourlyTempDaySeven: any[] = [];
      for(let x=144; x<168; x++) {
        const initTempDaySeven = weatherData ? Math.round(weatherData.hourly.temperature_2m[x]) : 0;
        initHourlyTempDaySeven.push(initTempDaySeven);
      }

      
      setCurrentTemperature(initialCurrentTemp);
      setFeelsLikeTemperature(initialFeelslikeTemp);
      setWindSpeed(initialWindSpeed);
      setPrecipitationVaue(initialPrecipitation);
      setMaximumTemperatureValues(initialMaxTemps);
      setMinimumTemperatureValues(initialMinTemps);
    }
  },[weatherData])

  const switchToImperial = () => {
    if (isMetric === true) {
      setisMetric(false);
      console.log(isMetric);
      setNextUnit("Metric");
      setDataUnit(otherDataUnitImperial)
      toFahrenheit();
      toMph();
      toInches();
    } else if (isMetric === false) {
      setisMetric(true);
      console.log(isMetric);
      setNextUnit("Imperial");
      toCelcius();
      toKph();
      toMillimeters();
      setDataUnit(otherDataUnitMetric)
    }
  }

  function toCelcius() {
    const celsiusButton = document.getElementById("celciusBtn");
    const fahrenheitButton = document.getElementById("fahrenheitBtn");
    const fahrenheitCheckmark = document.getElementById("fahrenheitCheckmark");
    const celciusCheckmark = document.getElementById("celciusCheckmark")

    celsiusButton?.classList.add('bg-neutral-700')
    fahrenheitButton?.classList.remove('bg-neutral-700')
    fahrenheitCheckmark?.classList.add('hidden')
    celciusCheckmark?.classList.remove("hidden")
    setCurrentTemperature(temperature);
    setFeelsLikeTemperature(feelsLike);
    setMaximumTemperatureValues(maxTemps);
    setMinimumTemperatureValues(minTemps);
    setHourlyTemperatureDayOne(hourlyTempDayOne)
    setHourlyTemperatureDayTwo(hourlyTempDayTwo)
    setHourlyTemperatureDayThree(hourlyTempDayThree)
    setHourlyTemperatureDayFour(hourlyTempDayFour)
    setHourlyTemperatureDayFive(hourlyTempDayFive)
    setHourlyTemperatureDaySix(hourlyTempDaySix)
    setHourlyTemperatureDaySeven(hourlyTempDaySeven)
  }

  function toFahrenheit(){
    const celsiusButton = document.getElementById("celciusBtn");
    const fahrenheitButton = document.getElementById("fahrenheitBtn");
    const fahrenheitCheckmark = document.getElementById("fahrenheitCheckmark");
    const celciusCheckmark = document.getElementById("celciusCheckmark")

    celsiusButton?.classList.remove('bg-neutral-700')
    fahrenheitButton?.classList.add('bg-neutral-700')
    celciusCheckmark?.classList.add('hidden')
    fahrenheitCheckmark?.classList.remove("hidden")
    setCurrentTemperature(Math.round(temperature * 9/5) + 32);
    setFeelsLikeTemperature(Math.round(feelsLike * 9/5) + 32);
    setHourlyTemperatureDayOne(hourlyTempDayOneImperial)
    setHourlyTemperatureDayTwo(hourlyTempDayTwoImperial)
    setHourlyTemperatureDayThree(hourlyTempDayThreeImperial)
    setHourlyTemperatureDayFour(hourlyTempDayFourImperial)
    setHourlyTemperatureDayFive(hourlyTempDayFiveImperial)
    setHourlyTemperatureDaySix(hourlyTempDaySixImperial)
    setHourlyTemperatureDaySeven(hourlyTempDaySevenImperial)

    const imperialMaxTemps = []
    for(let i = 0; i < 7; i++) {
      const imperialmaxTempValue = Math.round(maximumTemperatureValues[i] * 9/5) + 32;
      imperialMaxTemps.push(imperialmaxTempValue)
    }
    const imperialMinTemps = []
    for(let i = 0; i < 7; i++) {
      const imperialminTempValue = Math.round(minimumTemperatureValues[i] * 9/5) + 32;
      imperialMinTemps.push(imperialminTempValue)
    }

    setMaximumTemperatureValues(imperialMaxTemps);
    setMinimumTemperatureValues(imperialMinTemps);
  }

  function toMph() {
    const mphButton = document.getElementById('mphBtn')
    const kphButtn = document.getElementById('kphBtn')
    const kphCheckmark = document.getElementById('kphCheckmark')
    const mphCheckmark = document.getElementById('mphCheckmark')

    mphButton?.classList.add('bg-neutral-700')
    kphButtn?.classList.remove('bg-neutral-700')
    kphCheckmark?.classList.add('hidden')
    mphCheckmark?.classList.remove('hidden')
    setWindSpeed(Math.round(wind * 0.621371));
    setWindUnit(" mph")
  }

  function toKph() {
    const mphButton = document.getElementById('mphBtn')
    const kphButtn =document.getElementById('kphBtn')
    const kphCheckmark = document.getElementById('kphCheckmark')
    const mphCheckmark = document.getElementById('mphCheckmark')

    mphButton?.classList.remove('bg-neutral-700')
    kphButtn?.classList.add('bg-neutral-700')
    kphCheckmark?.classList.remove('hidden')
    mphCheckmark?.classList.add('hidden')
    setWindSpeed(wind);
    setWindUnit(" km/h")
  }

  function toMillimeters() {
    const mmButton = document.getElementById('mmBtn')
    const inchesButton = document.getElementById('inchesBtn')
    const millimetersCheckmark = document.getElementById('millimetersCheckmark')
    const inchesCheckmark = document.getElementById('inchesCheckmark')

    mmButton?.classList.add('bg-neutral-700')
    inchesButton?.classList.remove('bg-neutral-700')
    millimetersCheckmark?.classList.remove('hidden')
    inchesCheckmark?.classList.add('hidden')

    setPrecipitationVaue(precipitation);
    setPrecipitationUnit(" mm")
  }

  function toInches() {
    const mmButton = document.getElementById('mmBtn')
    const inchesButton = document.getElementById('inchesBtn')
    const millimetersCheckmark = document.getElementById('millimetersCheckmark')
    const inchesCheckmark = document.getElementById('inchesCheckmark')

    mmButton?.classList.remove('bg-neutral-700')
    inchesButton?.classList.add('bg-neutral-700')
    millimetersCheckmark?.classList.add('hidden')
    inchesCheckmark?.classList.remove('hidden')
    setPrecipitationVaue(Math.round(precipitation / 25.4 * 100) / 100);
    setPrecipitationUnit(" in")
  }
  
  return (
    <div className="fex items-center justify-items-center w-full mt-4 tablet:px-6 desktop:px-28 desktop:pt-12 desktop:pb-20">
      <div className='w-full flex flex-col items-center'>
        <div className='w-full flex items-center justify-center flex-col'>
          <div className='w-[90%] flex items-center justify-between tablet:w-full'>
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
              <UnitDropdown switchToImperial={switchToImperial} toCelcius={toCelcius} toFahrenheit={toFahrenheit} toMph={toMph} toKph={toKph} toInches={toInches} toMillimeters={toMillimeters} nextUnit={nextUnit} />
            </div>
          </div>
          <div className='w-[90%] flex flex-col items-center mt-12 tablet:w-[482px] tablet:full'>
            <h1 className='text-white text-5xl font-bold font-bricolage-grotesque text-center text-balance'>How&apos;s the sky looking today?</h1>
          </div>
          <div className='w-[90%] flex flex-col items-center mt-12 tablet:w-full sm-desktop:w-[720px]'>
            <SearchBar  />
            <SearchButton />
          </div>
          <div className='w-full mt-8 mb-5 sm-desktop:flex desktop:h-[693px] sm-desktop:justify-center'>
            <div className='w-full flex items-center justify-center tablet:w-full sm-desktop:mr-8 sm-desktop:w-[70%] sm-desktop:h-full desktop:w-[800px]'>
              <div className='w-full flex flex-col justify-center items-center'>
                <div className="w-full flex items-center justify-center">
                  {weatherData ? (
                    <TodayCard date={date} temperature={currentTemperature} city={city} country={country} weatherCode={weatherCode} />
                  ) : (
                    <div className="text-white">Loading weather data...</div>
                  )}
                </div>
                <div className='w-[90%] flex flex-col md:flex-row items-center justify-between mt-5 mb-8 tablet:w-full sm-desktop:mt-8 sm-desktop:mb-12'>
                  <div className='text-white text-2xl w-full font-semibold md:mb-0 grid grid-cols-2 grid-rows-2 gap-4 tablet:grid-cols-4 tablet:grid-rows-1'>
                    <div className='flex flex-col items-center w-full'>
                      <OtherDataCard otherDataTitle={otherDataTitle[0]} otherData={feelsLikeTemperature} otherDataUnit={dataUnit[0]} />
                    </div>
                    <div>
                      <OtherDataCard otherDataTitle={otherDataTitle[1]} otherData={humidity} otherDataUnit={dataUnit[1]} />
                    </div>
                    <div>
                      <OtherDataCard otherDataTitle={otherDataTitle[2]} otherData={windSpeed} otherDataUnit={windUnit} />
                    </div>
                    <div>
                      <OtherDataCard otherDataTitle={otherDataTitle[3]} otherData={precipitationValue} otherDataUnit={precipitationUnit} />
                    </div>
                  </div>
                </div>
                <div className='w-[90%] flex flex-col items-center mb-5 tablet:w-full sm-desktop:mb-0'>
                  <div className='w-full mb-5 font-dm-sans font-semibold text-xl text-neutral-0 leading-6'>
                    <p>Daily forecasts</p>
                  </div>
                  <div className='w-full'>
                    <div className='grid grid-cols-3 grid-rows-3 gap-4 tablet:grid-cols-7 tablet:grid-rows-1'>
                      <div>
                        <DailyForecastCard weatherCode={dailyWeatherCodes[0]} maxTemp={maximumTemperatureValues[0]} minTemp={minimumTemperatureValues[0]} date={firstDay} />
                      </div>
                      <div>
                        <DailyForecastCard weatherCode={dailyWeatherCodes[1]} maxTemp={maximumTemperatureValues[1]} minTemp={minimumTemperatureValues[1]} date={secondDay} />
                      </div>
                      <div>
                        <DailyForecastCard weatherCode={dailyWeatherCodes[2]} maxTemp={maximumTemperatureValues[2]} minTemp={minimumTemperatureValues[2]} date={thirdDay} />
                      </div>
                      <div>
                        <DailyForecastCard weatherCode={dailyWeatherCodes[3]} maxTemp={maximumTemperatureValues[3]} minTemp={minimumTemperatureValues[3]} date={fourthDay} />
                      </div>
                      <div>
                        <DailyForecastCard weatherCode={dailyWeatherCodes[4]} maxTemp={maximumTemperatureValues[4]} minTemp={minimumTemperatureValues[4]} date={fifthDay} />
                      </div>
                      <div>
                        <DailyForecastCard weatherCode={dailyWeatherCodes[5]} maxTemp={maximumTemperatureValues[5]} minTemp={minimumTemperatureValues[5]} date={sixthDay} />
                      </div>
                      <div>
                        <DailyForecastCard weatherCode={dailyWeatherCodes[6]} maxTemp={maximumTemperatureValues[6]} minTemp={minimumTemperatureValues[6]} date={seventhDay} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full sm-desktop:w-[28%] sm-desktop:h-full sm-desktop:rounded-b-lg desktop:h-full'>
              <div className='w-full flex flex-col items-center'>
                <div className='w-[90%] bg-neutral-800 rounded-lg px-5 py-0 pt-5 h-[693px] tablet:w-full'>
                  <div className='flex items-center justify-between mb-5'>
                    <div className='font-dm-sans font-semibold text-xl text-neutral-0 leading-5'>
                      <p>Hourly Forecast</p>
                    </div>
                    <div>
                      <HourlyForecastDropdown buttonClick={changeForecastDay} firstDay={firstDay} secondDay={secondDay} thirdDay={thirdDay} fourthDay={fourthDay} fithDay={fifthDay} sixthDay={sixthDay} seventhDay={seventhDay} />
                    </div>
                  </div>
                  <div className='overflow-y-scroll h-[595px] snap-y sm-desktop:h-[580px]'>
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
        </div>
      </div>
    </div>
  )
}
