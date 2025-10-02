import React from 'react'

interface HourlyForecastProps {
    hourlyTemperature?: number[];
    hourlyWeatherCode?: number[];
}

function HourlyForecast({hourlyTemperature, hourlyWeatherCode}: HourlyForecastProps) {
  return (
    <div className='bg-neutral-700 w-full h-[60px] rounded-lg'>
        <div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default HourlyForecast