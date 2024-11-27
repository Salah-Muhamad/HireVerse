import React from 'react'

export default function JobTitle({logo,maintitle,companyname}) {
  return (
    <div className='flex justify-between'>
        <div className="text flex ">
        <div className="logo mt-2">
            <img src={logo} className='mr-3'/>
        </div>
        <div >
        <p className="font-sf_pro_text font-semibold text-2xl">{maintitle}</p>
        <p className="companyname font-bai_jamjuree text-xs font-normal text-[#0146B1]">{companyname}</p>
        </div>
        </div>
        <button className='bg-[#143567] w-28 h-11 rounded-lg text-[#FFFFFF] mr-16'>Apply Now</button>
    </div>
  )
}
