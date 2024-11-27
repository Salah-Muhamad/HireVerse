import React from 'react'
import company from '../../assets/Images/company.svg'
import logo from '../../assets/Images/Microsoftlogo.svg'
import location from '../../assets/Images/location.svg'
import salary from '../../assets/Images/salary.svg'
import line2 from '../../assets/Images/Line 27.svg'

export default function JobDetails() {
  return (
    <div>
      <div className="container w-10/12 m-auto bg-[#F9F9F9] p-3 mt-10" >
        <img src={company} alt="" />
        <p className='text-[#616161] text-sm font-bai_jamjuree font-medium mt-7 mb-7'>- job details</p>
        <div className='grid grid-cols-12 flex'>
            <div className="col-span-9">
            <div className='flex justify-between'>
                <div className="text flex ">
                <div className="logo mt-2">
                <img src={logo} className='mr-3'/>
                </div>
        <div >
        <p className="font-sf_pro_text font-semibold text-2xl">Full Stack Developer</p>
        <p className="companyname font-bai_jamjuree text-xs font-normal text-[#0146B1]">Microsoft</p>
        </div>
        </div>
        <button className='bg-[#143567] w-28 h-11 rounded-lg text-[#FFFFFF] mr-16'>Apply Now</button>
    </div>
        <img src={line2} className='mt-8' />
            <div className='w-[851px]'>
                <h2 className='font-medium text-lg font-bai_jamjuree mb-2 mt-6'>Summary:</h2>
                <p className='font-normal text-sm font-bai_jamjuree text=[#474747]'>As a Full Stack Developer, you will be responsible for designing, developing, and maintaining scalable software solutions across both 
                front-end and back-end components. Working closely with a cross-functional team, you’ll play a key role in delivering high-quality
                applications that meet the needs of both the business and end users.</p>
        </div>           
            </div>
            {/* <div className="line">
                <img src={line} alt="" />
            </div> */}
            <aside className='col-span-3 h-3'>
                <h3 className="time font-sf_pro_text font-bold text-lg">Full-Time</h3>
                <div className="location flex">
                    <img src={location}  />
                    <p>New York</p>
                </div>
                <div className="salary flex">
                    <img src={salary}  />
                    <p>$80,000 - $100,000 annually</p>
                </div>
            </aside>
        </div>
        
        </div>
    </div>
  )
}
