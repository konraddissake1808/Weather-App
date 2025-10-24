import React, { useRef } from 'react'
import Image from 'next/image'
import downArrow from '../../../public/icon-dropdown.svg'
import { changeForecastDay } from '@/app/dashboard/page'

interface HourlyForecastDropdownProps {
  firstDay?: string;
  secondDay?: string;
  thirdDay?: string;
  fourthDay?: string;
  fithDay?: string;
  sixthDay?: string;
  seventhDay?: string;
}

function HourlyForecastDropdown( {firstDay, secondDay, thirdDay, fourthDay, fithDay, sixthDay, seventhDay}: HourlyForecastDropdownProps) {

     const dropdownMenuRef = useRef<HTMLDivElement>(null)
    
      const dropdown = () => {
        console.log('dropdown clicked')
        dropdownMenuRef.current?.classList.toggle('hidden')
    }
    
    //const day = days;

    const day = [firstDay, secondDay, thirdDay, fourthDay, fithDay, sixthDay, seventhDay];

    /*function changeForecastButtonDay(days:string, index:number) {
        console.log(`${days} clicked at index ${index}`)
    }*/

  return (
    <div>
      <div>
        <button id='dayButton' className='bg-neutral-600 flex items-center px-4 py-2 rounded-lg' onClick={dropdown}>
          <p id='dayButtonText' className='mr-3 font-dm-sans font-medium text-base'>{day[0]}</p>
          <Image src={downArrow} alt='down arrow' width={32} height={32} className='w-3 h-[18px]' />
        </button>
      </div>
      <div id='unit-menu' ref={dropdownMenuRef} className='relative hidden z-10 duration-200'>
        <div className='bg-neutral-800 w-[214px] right-0 rounded-lg absolute mt-2 py-1.5 px-2'>
          <div >
            {day.map((days, index) => (
              <div key={index} className=''>    
                  <div className='mb-1 bg-neutral-800 rounded-lg'>
                      <button onClick={() => changeForecastDay(days ?? '', index)} className='forecastDayButton font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5'>{days}</button>
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