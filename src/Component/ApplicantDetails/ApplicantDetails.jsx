import React from 'react'

export default function ApplicantDetails({title , icon , number}) {
  return (
      <div className='w-64 h-[137px] rounded-xl bg-white mt-4 mx-24 px-4 pt-4 flex flex-col justify-between'>
        <div className='flex justify-between'>
            <p className='font-sf_pro_text text-lg font-normal'>{title}</p>
            <img src={icon} alt="" />
        </div>
        <p className='font-sf_pro_text font-bold text-2xl pb-4'>{number}</p>
      </div>
    
  )
}
