import React from 'react'
import Image from 'next/image';
import UnitDropdown from '../unitDropdown/UnitDropdown';

function switchToImperial() {
  console.log("Switching to Imperial units");
}
function toFahrenheit() {
  console.log("Switching to Fahrenheit");
}   
function toCelcius() {
  console.log("Switching to Celcius");
}
function toMph() {
  console.log("Switching to Mph");
}
function toKph() {
  console.log("Switching to Kph");
}
function toInches() {
  console.log("Switching to Inches");
}
function toMillimeters() {
  console.log("Switching to Millimeters");
}  

const nextUnit = "Imperial";

function ErrorDashboard() {
  return (
    <div className="fex items-center justify-items-center w-full mt-4 tablet:px-6 desktop:px-28 desktop:pt-12 desktop:pb-20">
      <div className='w-full flex flex-col items-center'>
        <div className='w-full flex items-center justify-center flex-col'>
          <div className='w-[90%] flex items-center justify-between tablet:w-full'>
            <div>
              <Image
                src="/logo.svg"
                alt="Weather App Logo"
                width={128}
                height={32}
                priority

                className='w-32 h-8'
              />
            </div>
            <div>
              <UnitDropdown switchToImperial={switchToImperial} toCelcius={toCelcius} toFahrenheit={toFahrenheit} toMph={toMph} toKph={toKph} toInches={toInches} toMillimeters={toMillimeters} nextUnit={nextUnit} />
            </div>
          </div>
          <div className='w-[90%] flex flex-col items-center mt-12 tablet:w-[482px] tablet:full'>
            <h1 className='text-white text-5xl font-bold font-bricolage-grotesque text-center text-balance'>How&apos;s the sky looking today?</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorDashboard