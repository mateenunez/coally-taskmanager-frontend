import React from 'react'
import { FaLinkedin  } from "react-icons/fa";

function Navigation() {
  return (
    <div className="w-full h-20 relative flex flex-col justify-center">
    <div className=" text-center text-[#7743db] text-[32px] font-bold ">Task Manager</div>
    <div className='flex justify-center'><a href='https://www.linkedin.com/in/mateo-nu%C3%B1ez-50093a218/' target='_blank' className="text-center text-[#767676] text-xs font-bold hover:text-blue-600 transition ease-in-out delay-100 flex flex-row gap-2"><FaLinkedin size={20}/></a></div>
    </div>
  )
}

export default Navigation