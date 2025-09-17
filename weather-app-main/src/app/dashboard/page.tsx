import React from 'react'
import Image from 'next/image'
import { weatherData } from "@/lib/meteo";

export default function Dashboard() {

    console.log(weatherData);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen mt-4 pb-20 gap-16 sm:p-20">
        <div>
        <Image
          src="/logo.svg"
          alt="Weather App Logo"
          width={128}
          height={32}
          priority
        />
      </div>
      <div></div>
    </div>
  )
}
