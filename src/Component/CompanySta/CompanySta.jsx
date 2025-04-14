import React from 'react'

export default function ApplicantDetails({title , icon , number , comp}) {
  return (
      <div className=' h-[137px] rounded-xl bg-white mt-4 w-1/4 px-4 pt-4 flex flex-col justify-between'>
        <div className='flex justify-between'>
            <p className='font-sf_pro_text text-lg font-normal'>{title}</p>
            <img src={icon} alt="" />
        </div>
        <p className='font-sf_pro_text font-bold text-2xl pb-4'>{number}</p>
        <p className='font-sf_pro_text  pb-4'>{comp} <span className='text-[#A7A7A7]'>vs last month</span></p>
      </div>
    
  )
}
