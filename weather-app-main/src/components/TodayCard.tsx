import React from 'react'

type TodayCardProps = {
  date?: string;
  temperature?: number;
  city?: string;
  country?: string | null;
};

function TodayCard({ date, temperature, city, country }: TodayCardProps) {


  return (
    <div id="today-card" className="rounded-3xl h-[286px] bg-contain bg-center w-[90%] flex flex-col items-center text-center">
        <div className="w-full flex justify-between px-6 pt-6 flex-col">
            <p className='text-[28px] leading-5 font-bold text-neutral-0 font-dm-sans'>{city}, {country}</p>
            <p className='text-lg leading-5 font-medium text-neutral-0 opacity-80 font-dm-sans'>{date}</p>
            <div>
              <p>{temperature}</p>
            </div>
        </div>
    </div>
  )
}

export default TodayCard