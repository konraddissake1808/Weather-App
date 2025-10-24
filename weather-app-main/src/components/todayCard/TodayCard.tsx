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

type TodayCardProps = {
  date?: string;
  temperature?: number;
  city?: string;
  country?: string | null;
  weatherCode?: string;
};



function TodayCard({ date, temperature, city, country, weatherCode }: TodayCardProps) {

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
    <div id="today-card" className="rounded-3xl h-[286px] bg-conver bg-center w-[90%] flex flex-col items-center text-center justify-center">
      <div className="w-full flex justify-between items-center flex-col">
        <p className='text-[28px] leading-5 font-bold text-neutral-0 font-dm-sans'>{city}, {country}</p>
        <p className='text-lg leading-5 font-medium text-neutral-0 opacity-80 font-dm-sans mt-3'>{date}</p>
        <div className='mt-4 flex'>
          <div>
            <Image 
              src={weatherBackgrounds[weatherCode as keyof typeof weatherBackgrounds] || clearSky} 
              alt="Weather Icon" 
              width={100} 
              height={100} 
              className="mx-auto"
            />
          </div>
          <div className='ml-5 pr-5'>
            <p className='font-dm-sans font-semibold italic text-8xl'>{temperature}°</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodayCard