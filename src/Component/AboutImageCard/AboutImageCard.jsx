import React from 'react'

export default function AboutImageCard({image ,name ,pos}) {
  return (
    <div className='mt-11 mb-11'>
      <div className="card rounded-xl w-72	 h-96">
        <img src={image} className='w-full h-full'  />
        <p className='font-sf_pro_text ms-3 font-semibold'>{name}</p>
        <p className='font-sf_pro_text text-[#838383] text-[.983rem] ms-3'>{pos}</p>
      </div>
    </div>
  )
}
