import React from 'react'

type TodayCardProps = {
  date?: string;
  temperature?: number;
  city?: string;
};

function TodayCard({ date, temperature, city }: TodayCardProps) {


  return (
    <div id="today-card" className="rounded-3xl h-[286px] bg-contain bg-center w-[90%] flex flex-col items-center">
        <div className="w-full flex justify-between px-6 pt-6 flex-col">
            <p>{date}</p>
            <p>{temperature}</p>
            <p>{city}</p>
        </div>
    </div>
  )
}

export default TodayCard