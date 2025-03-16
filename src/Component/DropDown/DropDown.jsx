import React from "react";
import { useJobsProvider } from "../../Context/JobsContext";

export default function DropDown({ title, options , onOptionSelect , property }) {
  const {filter} = useJobsProvider()
  return (
    
    <>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <span className="text-md text-black font-bold font-sf_pro_text"> {title} </span>

          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>

        <ul className="mt-2 space-y-1 px-4">
          {options.map((option , index) => {
            return (
              <li className="flex gap-3" key={index}>
                <input type="checkbox" id={option.value} checked = {filter[property].includes(option.value)} onClick={()=>onOptionSelect(property , option.value)}/>
                <label htmlFor={option.value}>{option.name}</label>
              </li>
            );
          })}
        </ul>
      </details>
    </>
  );
}
