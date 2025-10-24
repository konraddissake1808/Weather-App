import React, {useEffect, useRef} from 'react'
import Image from 'next/image'
import unitDropdownIcon from '../../../public/icon-units.svg'
import downArrow from '../../../public/icon-dropdown.svg'


function UnitDropdown() {

  const dropdownMenuRef = useRef<HTMLDivElement>(null)

  const dropdown = () => {
    console.log('dropdown clicked')
    dropdownMenuRef.current?.classList.toggle('hidden')
  }

  /*useEffect(()=> {
    document.addEventListener('click', function outsideMenuClick(e){
      const unitMenu = document.getElementById('unit-menu');
      if(!unitMenu?.contains(e.target as HTMLElement)) {
        dropdownMenuRef.current?.classList.toggle('hidden')
      }
    })
  })*/

  const switchToImperial = () => {
    console.log('switched to imperial')
  }

  return (
    <div>
      <div>
        <button className='bg-neutral-800 flex items-center px-4 py-2 rounded-lg' onClick={dropdown}>
          <Image alt='unit dropdown' src={unitDropdownIcon} width={32} height={32} className='w-3.5 h-3.5' />
          <p className='mx-2.5 font-dm-sans font-medium text-sm'>Units</p>
          <Image src={downArrow} alt='down arrow' width={32} height={32} className='w-2.5 h-3.5' />
        </button>
      </div>
      <div id='unit-menu' ref={dropdownMenuRef} className='relative hidden z-10 duration-200'>
        <div className='bg-neutral-800 w-[214px] right-0 rounded-lg absolute mt-2 py-1.5 px-2'>
          <div className='mb-1'>
            <button className='font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5' onClick={switchToImperial}>Switch to Imperial</button>
          </div>
          <div className='mb-1'>
            <div className='font-dm-sans font-medium text-neutral-300 text-sm mb-2 h-[23px]'>
              <p className='px-1.5 pt-1.5'>Temperature</p>
            </div>
            <div className='font-dm-sans font-medium text-base text-neutral-0'>
              <div className='mb-1 bg-neutral-700 rounded-lg'>
                <button className='font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5'>Celsius (°C)</button>
              </div>
              <div>
                <button className='font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5'>Fahrenheit (°F)</button>
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
              <div className='mb-1 bg-neutral-700 rounded-lg'>
                <button className='font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5'>km/h</button>
              </div>
              <div>
                <button className='font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5'>mph</button>
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
              <div className='mb-1 bg-neutral-700 rounded-lg'>
                <button className='font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5'>Millimeters (mm)</button>
              </div>
              <div>
                <button className='font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5'>Inches (in)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitDropdown