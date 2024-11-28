import React from 'react'
import locationn from '../../assets/Images/emptylocation.svg'
export default function Job({logo,jobtitle,company,location,site,time,salary,desc,posted}) {
  return (
    <div className='bg-[#f4f4f4] p-8 rounded-lg h-56 relative mb-9'>
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
        <div className="site flex gap-4 mt-7 mb-3">
        <div className="skill flex justify-center items-center bg-[#f7e4ca] rounded-xl h-6  text-sm font-normal w-fit p-4">
            <p className='text-[#D39339]'>{site}</p>
        </div>
        <div className="skill flex justify-center items-center bg-[#E1F1EFD4] rounded-xl h-6  text-sm font-normal w-fit p-4">
            <p className='text-[#0C7566]'>{time}</p>
        </div>
        <p className='text-[#636363] text-sm font-sf_pro_text mt-2'>{salary}</p>
        </div>
        <div className="desc text-sm font-bai_jamjuree text-[#6A6A6A]">
            <p>{desc}</p>
        </div>
        <p className='posted absolute right-3 bottom-3 text-[#707070] text-xs' >{posted}</p>
    </div>
  )
}
