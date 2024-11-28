import React from 'react'
import locationn from '../../assets/Images/emptylocation.svg'
export default function Job({logo,jobtitle,company,location,site,time,salary,desc,posted}) {
  return (
    <div className='bg-[#f4f4f4] p-8 rounded-lg h-56'>
        <div className="jobtitle flex gap-4 justify-between">
            <div className='flex gap-4'>
            <img src={logo} alt="" />
            <div className="txt">
                <p className='font-sf_pro_text font-semibold text-xl'>{jobtitle}</p>
                <p className='text-[#0146B1] text-sm font-bai_jamjuree'>{company}</p>
            </div>
            </div>
            <div className="location flex gap-2">
            <img src={locationn} className='w-6 h-6'/>
            <p>{location}</p>
            </div>
        </div>
        <div className="site">
            <p className='bg-[#f7e9d6f4] text-[#D39339] w-fit p-4 rounded-lg h-8 text-center'>{site}</p>
        </div>
    </div>
  )
}
