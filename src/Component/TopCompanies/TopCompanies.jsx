import React from 'react'

export default function TopCompanies({icon , companyName , position , locationIcon , location}) {
  return (
    <>
        <div className='w-[424px] h-[104px] border-2 border-[#E4E5E8] rounded-lg mb-8 flex items-center'>
            <div className='flex gap-4 font-bai_jamjuree'>
                <div className='ms-4'>
                    <img src={icon} alt="" />
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <p className='text-[#191F33] font-semibold text-[18px]'>{companyName}</p>
                        <div className='bg-[#FCEEEE] px-8 h-7 rounded-[52px] justify-center flex items-center'>
                            <p className='text-[#E05151] font-normal text-[14px]'>{position}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <img src={locationIcon} alt="" />
                        <p className='text-[#767F8C] text-[14px]'>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
