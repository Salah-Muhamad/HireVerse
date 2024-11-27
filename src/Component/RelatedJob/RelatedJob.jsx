import React from 'react'

export default function RelatedJob({logo , jobtitle , worksin,time, location ,date, apllicants}) {
  return (
    <div className='bg-[#F9F9F9] w-[499px] h-44 p-6 mb-7'>
        <div className="text flex mb-5">
                <div className="logo mt-2">
                  <img src={logo} className="mr-3" />
                </div>
                <div>
                  <p className="font-sf_pro_text font-bold text-lg">
                    {jobtitle}
                  </p>
                  <p className="companyname font-bai_jamjuree text-xs font-normal text-[#474747]">
                    {worksin}
                  </p>
                </div>
        </div>
        <div className="row flex gap-4 ">
        <div className="flex justify-center items-center bg-[#EFEFEF] rounded-xl h-6 p-4 w-fit text-sm font-normal ">
                {time}
        </div>
        <div className="flex justify-center items-center bg-[#EFEFEF] rounded-xl h-6 p-4 w-fit text-sm font-normal">
                {location}
        </div>
        </div>
        <div className="row2 mt-3 text-sm font-medium font-sf_pro_text text-[#666666]">
            <p>{date}<span className='ml-2'>•{apllicants}</span></p>
        </div>
            
    </div>
  )
}
