import React from 'react'
import { useContext } from 'react';
import { TaskContext } from '@/contexts/tasksContext';

function ErrorMessage({message}) {

     const {setError} = useContext(TaskContext);

    const handleError = () => {
        setError(undefined)
    }
    
  return (
    <div className='w-full h-80 flex justify-center items-center'>
      <div className='min-w-52 max-w-80 min-h-fit max-h-52 p-3 bg-white rounded-lg border border-[#c3c2c2] flex-col justify-start items-start gap-6'>
        <div className=' p-6'>
        <h3 className='text-black text-2xl font-semibold font-mono self-stretch'> Hubo un error! </h3>
        <h3 className='text-base font-normal self-stretch'> {message} </h3>
        </div>
        <div className='flex justify-end p-2'>
        <button className=' text-white bg-[#7743db] rounded-lg border border-[#2c2c2c] p-1.5' onClick={handleError}>Aceptar</button>
        </div>
        </div>
    </div>
  )
}

export default ErrorMessage