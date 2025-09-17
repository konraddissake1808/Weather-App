'use client';
import React from 'react'
import Image from 'next/image'
import { weatherData } from "@/lib/meteo";
import TodayCard from '../components/TodayCard';

export default function Dashboard() {

    console.log(weatherData);
    //const date = "Monday, 5th July";
    const [date, setDate] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
      if (
        weatherData &&
        weatherData.hourly &&
        Array.isArray(weatherData.hourly.time) &&
        weatherData.hourly.time.length > 0
      ) {
        const localtime = weatherData.hourly.time[0];
        const dateObj = new Date(localtime);
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);
        setDate(formattedDate);
      }
    }, []);


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
              />
            </div>
          </div>
          <div className='w-[90%] flex flex-col items-center'>
            <h1 className='text-white text-5xl font-bold mt-8 font-bricolage-grotesque text-center text-balance'>How&apos;s the sky looking today?</h1>
          </div>
          <div>

          </div>
          <div className="mt-8 w-full flex items-center justify-center">
            <TodayCard date={date} />
          </div>
        </div>
    </div>
  )
}
