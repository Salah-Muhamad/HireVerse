import React from 'react'

export default function JobDescription({summary}) {
  return (
    <div className='w-[851px]'>
        <h2 className='font-medium text-lg font-bai_jamjuree mb-2 mt-6'>Summary:</h2>
        <p className='font-normal text-sm font-bai_jamjuree text=[#474747]'>{summary}</p>

    </div>
  )
}
