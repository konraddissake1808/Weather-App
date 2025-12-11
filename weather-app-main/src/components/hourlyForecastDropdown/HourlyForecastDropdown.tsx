import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import downArrow from '../../../public/icon-dropdown.svg'

interface HourlyForecastDropdownProps {
  buttonClick: (days:string, index:number) => void;
  firstDay?: string;
  secondDay?: string;
  thirdDay?: string;
  fourthDay?: string;
  fithDay?: string;
  sixthDay?: string;
  seventhDay?: string;
}

function HourlyForecastDropdown( {buttonClick, firstDay, secondDay, thirdDay, fourthDay, fithDay, sixthDay, seventhDay}: HourlyForecastDropdownProps) {

  const dropdownMenuRef = useRef<HTMLDivElement>(null)
    
  const dropdown = () => {
    console.log('dropdown clicked')
    dropdownMenuRef.current?.classList.toggle('hidden')
  }

  const day = [firstDay, secondDay, thirdDay, fourthDay, fithDay, sixthDay, seventhDay];
  useEffect(() => {
    const activeButton = document.getElementById('hourlyForecastButton0');
    activeButton?.classList.remove('bg-neutral-800')
    activeButton?.classList.add('bg-neutral-700')
  }, [])

  useEffect(()=> {
    document.addEventListener('click', function outsideMenuClick(e){
      const dayMenuButton = document.getElementById('dayMenuButton');
      const dayMenu = document.getElementById("day-menu")
      if(!dayMenuButton?.contains(e.target as HTMLElement)) {
        dayMenu?.classList.add('hidden')
      }
    })
  })


  return (
    <div id='dayMenuButton'>
      <div>
        <button id='dayButton' className='bg-neutral-600 flex items-center px-4 py-2 rounded-lg' onClick={dropdown}>
          <p id='dayButtonText' className='mr-3 font-dm-sans font-medium text-base'>{day[0] ?? ''}</p>
          <Image src={downArrow} alt='down arrow' width={32} height={32} className='w-3 h-[18px]' />
        </button>
      </div>
      <div id='day-menu' ref={dropdownMenuRef} className='relative hidden z-10 duration-200'>
        <div className='bg-neutral-800 w-[214px] right-0 rounded-lg absolute mt-2 py-1.5 px-2'>
          <div id='hourlyForcastDropdownContainer'>
            {day.map((days, index) => (
              <div key={index} id={`forecastDayOption${index}`}>    
                <div id={`hourlyForecastButton${index}`} className='mb-1 bg-neutral-800 rounded-lg dropdownButton'>
                  <button onClick={() => buttonClick(days ?? '', index)} className=' font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5'>{days}</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default HourlyForecastDropdown