import React from 'react'

function TodayCard({date}: {date?: string}) {


  return (
    <div id="today-card" className="rounded-3xl h-[286px] bg-contain bg-center w-[90%] flex flex-col items-center">
        <div className="w-full flex justify-between px-6 pt-6">
            <p>{date}</p>
        </div>
    </div>
  )
}

export default TodayCard