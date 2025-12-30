import React from 'react'

function LoadingTodayCard() {
  return (
    <div id='loading-today-card' className="bg-neutral-800 rounded-3xl h-[286px] bg-conver bg-center w-[90%] flex flex-col items-center text-center justify-center tablet:w-full">
      <div className="w-full flex justify-between items-center flex-col">
        <p className='text-[28px] leading-5 font-bold text-neutral-0 font-dm-sans'></p>
        <p className='text-lg leading-5 font-medium text-neutral-0 opacity-80 font-dm-sans mt-3'></p>
        <div className='mt-4 flex'>
          <div>
            
          </div>
          <div className='ml-5 pr-5'>
            <p className='font-dm-sans font-semibold italic text-8xl'></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingTodayCard