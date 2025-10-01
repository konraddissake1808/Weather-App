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

interface DailyForecastCardProps {
  date?: string;
  maxTemp?: number;
  minTemp?: number;
  weatherCode?: string;
}

function DailyForecastCard({date, maxTemp, minTemp, weatherCode}: DailyForecastCardProps) {

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

  const shortenedDate = date ? date.slice(0, 3) : '';

  return (
    <div className='bg-neutral-800 h-[165px] flex flex-col justify-between items-center px-2.5 py-4 rounded-lg'>
        <div className='font-dm-sans font-medium text-[18px]'>
            <p>{shortenedDate}</p>
        </div>
        <div>
            <Image 
                src={weatherBackgrounds[weatherCode as keyof typeof weatherBackgrounds] || clearSky} 
                alt="Weather Icon" 
                width={30} 
                height={30} 
                className="mx-auto h-[60px] w-[60px]"
            />
        </div>
        <div className='flex justify-between w-full'>
            <div className='font-dm-sans font-medium text-base text-neutral-0'>
                <p>{maxTemp}°</p>
            </div>
            <div className='font-dm-sans font-medium text-base text-neutral-200'>
                <p>{minTemp}°</p>
            </div>
        </div>
    </div>
  )
}

export default DailyForecastCard