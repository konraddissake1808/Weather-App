import React, {useEffect, useRef} from 'react'
import Image from 'next/image'
import unitDropdownIcon from '../../../public/icon-units.svg'
import downArrow from '../../../public/icon-dropdown.svg'
import checkmarkIcon from '../../../public/icon-checkmark.svg'

interface UnitDropdownProps {
  switchToImperial: () => void;
  toCelcius: () => void;
  toFahrenheit: () => void;
  toMph: () => void;
  toKph: () => void;
  toMillimeters: () => void;
  toInches: () => void;
  nextUnit?: string;
}


function UnitDropdown({toInches ,toMillimeters ,toKph, toMph, toFahrenheit, toCelcius, switchToImperial, nextUnit }: UnitDropdownProps) {

  const dropdownMenuRef = useRef<HTMLDivElement>(null)

  const dropdown = () => {
    console.log('dropdown clicked')
    dropdownMenuRef.current?.classList.toggle('hidden')
  }

  useEffect(()=> {
    document.addEventListener('click', function outsideMenuClick(e){
      const unitMenuButton = document.getElementById('unit-menu-button');
      const unitMenu = document.getElementById("unit-menu")
      if(!unitMenuButton?.contains(e.target as HTMLElement)) {
        unitMenu?.classList.add('hidden')
      }
    })
  })



  return (
    <div id='unit-menu-button'>
      <div>
        <button className='bg-neutral-800 flex items-center px-4 py-2 rounded-lg' onClick={dropdown}>
          <Image alt='unit dropdown' src={unitDropdownIcon} width={32} height={32} className='w-3.5 h-3.5' />
          <p className='mx-2.5 font-dm-sans font-medium text-sm'>Units</p>
          <Image src={downArrow} alt='down arrow' width={32} height={32} className='w-2.5 h-3.5' />
        </button>
      </div>
      <div  id="unit-menu" ref={dropdownMenuRef} className='relative hidden z-10 duration-200'>
        <div className='bg-neutral-800 w-[214px] right-0 rounded-lg absolute mt-2 py-1.5 px-2'>
          <div className='mb-1'>
            <button className='font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5' onClick={switchToImperial}>Switch to {nextUnit}</button>
          </div>
          <div className='mb-1'>
            <div className='font-dm-sans font-medium text-neutral-300 text-sm mb-2 h-[23px]'>
              <p className='px-1.5 pt-1.5'>Temperature</p>
            </div>
            <div className='font-dm-sans font-medium text-base text-neutral-0'>
              <div id='celciusBtn' className='mb-1 bg-neutral-700 rounded-lg'>
                <button className='font-dm-sans font-medium text-base text-neutral-0 w-full h-[39px] px-1.5' onClick={toCelcius}>
                  <div className='flex justify-between w-full items-center'>
                    <div>
                      <p>Celcius</p>
                    </div>
                    <div id='celciusCheckmark'>
                      <Image src={checkmarkIcon} alt='' />
                    </div>
                  </div>
                </button>
              </div>
              <div id='fahrenheitBtn' className='rounded-lg'>
                <button className='font-dm-sans font-medium text-base text-neutral-0 w-full h-[39px] px-1.5' onClick={toFahrenheit}>
                  <div className='flex justify-between w-full items-center'>
                    <div>
                      <p>Fahrenheit</p>
                    </div>
                    <div id='fahrenheitCheckmark' className='hidden'>
                      <Image src={checkmarkIcon} alt='' />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className='mb-1 text-neutral-600'>
            <hr></hr>
          </div>
          <div className='mb-1'>
            <div className='font-dm-sans font-medium text-neutral-300 text-sm mb-2 h-[23px]'>
              <p className='px-1.5 pt-1.5'>Wind Speed</p>
            </div>
            <div className='font-dm-sans font-medium text-base text-neutral-0'>
              <div id='kphBtn' className='mb-1 bg-neutral-700 rounded-lg'>
                <button className='font-dm-sans font-medium text-base text-neutral-0 w-full h-[39px] px-1.5' onClick={toKph}>
                  <div className='flex justify-between w-full items-center'>
                    <div>
                      <p>km/h</p>
                    </div>
                    <div id='kphCheckmark'>
                      <Image src={checkmarkIcon} alt='' />
                    </div>
                  </div>
                </button>
              </div>
              <div id='mphBtn' className='rounded-lg'>
                <button className='font-dm-sans font-medium text-base text-neutral-0 w-full h-[39px] px-1.5' onClick={toMph}>
                  <div className='flex justify-between w-full items-center'>
                    <div>
                      <p>mph</p>
                    </div>
                    <div id='mphCheckmark' className='hidden'>
                      <Image src={checkmarkIcon} alt='' />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className='mb-1 text-neutral-600'>
            <hr></hr>
          </div>
          <div className='mb-1'>
            <div className='font-dm-sans font-medium text-neutral-300 text-sm mb-2 h-[23px]'>
              <p className='px-1.5 pt-1.5'>Precipitation</p>
            </div>
            <div className='font-dm-sans font-medium text-base text-neutral-0'>
              <div id='mmBtn' className='mb-1 bg-neutral-700 rounded-lg'>
                <button className='font-dm-sans font-medium text-base text-neutral-0 w-full h-[39px] px-1.5' onClick={toMillimeters}>
                  <div className='flex justify-between w-full items-center'>
                    <div>
                      <p>Millimeters (mm)</p>
                    </div>
                    <div id='millimetersCheckmark'>
                      <Image src={checkmarkIcon} alt='' />
                    </div>
                  </div>
                </button>
              </div>
              <div id='inchesBtn' className='rounded-lg'>
                <button className='font-dm-sans font-medium text-base text-neutral-0 w-full h-[39px] px-1.5' onClick={toInches}>
                  <div className='flex justify-between w-full items-center'>
                    <div>
                      <p>Inches (in)</p>
                    </div>
                    <div id='inchesCheckmark' className='hidden'>
                      <Image src={checkmarkIcon} alt='' />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitDropdown