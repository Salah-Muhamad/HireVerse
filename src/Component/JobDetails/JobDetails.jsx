import React from 'react'
import company from '../../assets/Images/company.svg'
import JobTitle from '../JobTitle/JobTitle'
import logo from '../../assets/Images/Microsoftlogo.svg'
import line from '../../assets/Images/Line 28.svg'
import line2 from '../../assets/Images/Line 27.svg'
import JobDescription from '../JobDescription/JobDescription'
import UpperAsideJobDetails from '../UpperAsideJobDetails/UpperAsideJobDetails'
export default function JobDetails() {
  return (
    <div>
      <div className="container w-10/12 m-auto bg-[#F9F9F9] p-3 mt-10">
        <img src={company} alt="" />
        <p className='text-[#616161] text-sm font-bai_jamjuree font-medium mt-7 mb-7'>- job details</p>
        <div className='grid grid-cols-12 '>
            <div className="col-span-9">
                <JobTitle logo={logo} maintitle={'Full Stack Developer'} companyname={'Microsoft'}/>
                <img src={line2} className='mt-8' />
                <JobDescription
                    summary={'As a Full Stack Developer, you will be responsible for designing, developing, and maintaining scalableand back-end components Working closely with a cross-functional team, you’ll play a key role in delivering high-qualityapplications that meet the needs of both the business and end users.'}
                    responsibilities={''}
                    />
                    
            </div>
            <div className="line">
                <img src={line} alt="" />
            </div>
            <aside className='col-span-3 h-3'>
                <UpperAsideJobDetails time={'Full Time'} location={'New York'}/>
            </aside>
        </div>
        
      </div>
    </div>
  )
}
