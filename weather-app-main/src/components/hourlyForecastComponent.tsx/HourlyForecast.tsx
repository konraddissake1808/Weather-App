import React from 'react'
import Image from 'next/image';
import clearSky from '../../../public/icon-sunny.webp';
import partlyCloudy from '../../../public/icon-partly-cloudy.webp';
import overcast from '../../../public/icon-overcast.webp';
import fog from '../../../public/icon-fog.webp';
import drizzle from '../../../public/icon-drizzle.webp';
import rain from '../../../public/icon-rain.webp';
import snow from '../../../public/icon-snow.webp';
import thunderstorm from '../../../public/icon-storm.webp';

interface HourlyForecastProps {
    hourlyTemperature?: number;
    hourlyWeatherCode?: number|unknown;
    hour?: string;
}

function HourlyForecast({hourlyTemperature, hourlyWeatherCode, hour}: HourlyForecastProps) {

    const weatherBackgrounds = {
    "0": clearSky,
    "1": partlyCloudy,
    "2": partlyCloudy,
    "3": overcast,
    "45": fog,
    "48": fog,
    "51": drizzle,
    "53": drizzle,
    "55": drizzle,
    "56": drizzle,
    "57": drizzle,
    "61": rain,
    "63": rain,
    "65": rain,
    "66": rain,
    "67": rain,
    "71": snow,
    "73": snow,
    "75": snow,
    "77": snow,
    "80": rain,
    "81": rain,
    "82": rain,
    "85": snow,
    "86": snow,
    "95": thunderstorm,
    "96": thunderstorm,
    "99": thunderstorm,
  }

  return (
    <div className='bg-neutral-700 w-full h-[60px] rounded-lg mb-4 flex items-center'>
        <div className='flex items-center justify-between pr-4 w-full'>
            <div className='flex items-center'>
                <div className='mx-2'>
                    <Image 
                    src={weatherBackgrounds[hourlyWeatherCode as keyof typeof weatherBackgrounds] || clearSky} 
                    alt="Weather Icon" 
                    width={30} 
                    height={30} 
                    className="mx-auto h-[40px] w-[40px]"
                /></div>
                <div>
                    {hour}
                </div>
            </div>
            <div>
                <p>{hourlyTemperature}</p>
            </div>    
        </div>
    </div>
  )
}

export default HourlyForecast