import React from 'react'

interface OtherDataCardProps {
  otherDataTitle?: string;
  otherData?: string | number | null;
  otherDataUnitMetric?: string;
  otherDataUnitImperial?: string;
}

function OtherDataCard({otherDataTitle, otherData, otherDataUnitMetric, otherDataUnitImperial}: OtherDataCardProps) {



  return (
    <div className='h-[118px] w-full px-5 bg-neutral-800 flex items-center rounded-xl'>
        <div>
            <div className='mb-6 font-dm-sans font-medium text-[18px] text-neutral-200'>
                <p>{otherDataTitle}</p>
            </div>
            <div className='text-[32px] font-light text-neutral-0 font-dm-sans'>
                <p>{otherData}{otherDataUnitMetric}</p>
            </div>
        </div>
    </div>
  )
}

export default OtherDataCard