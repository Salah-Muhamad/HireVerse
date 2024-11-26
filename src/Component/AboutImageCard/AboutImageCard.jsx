import React from 'react'
import bashaelbalad from '../../assets/Images/bashaelbalad.svg'
export default function AboutImageCard() {
  return (
    <div className='mt-11 mb-11'>
      <div className="card rounded-xl w-72	 h-96">
        <img src={bashaelbalad} className='w-full h-full'  />
        <p className='font-sf_pro_text ms-3 font-semibold	'>Salah Muhamed</p>
        <p className='ms-3'>Front-End Developer</p>
      </div>
    </div>
  )
}
