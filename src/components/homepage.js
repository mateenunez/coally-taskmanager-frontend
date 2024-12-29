import React from 'react'
import Task from './task'
import Navigation from './navigation'
import Form from './form'
import { useContext } from 'react'
import { TaskContext } from '@/contexts/tasksContext'
import ErrorMessage from './errorMessage'


function HomePage() {


  const {allTasks, filter, setFilter, error} = useContext(TaskContext);

  const handleFilter = (e) => {
    switch (e.target.innerHTML){
      case 'Todas': setFilter('Todas');break;
      case 'Completadas': setFilter(true);break;
      case 'Pendientes': setFilter(false);break;
    }
    
  }

  return (

    <div className='pattern-dots pattern-violet-100 pattern-bg-white 
  pattern-size-10 pattern-opacity-100 h-screen'>
      {error==undefined ? 
      (
      <div className='p-8 overflow-hidden'>
      <Navigation/>
      <div className='md:w-1/2 justify-center flex flex-row gap-6 sm:gap-2 m-10 md:m-0'>
      <button className='font-semibold text-[#8c6acb] border border-[#767676] rounded-lg p-2' onClick={(e)=>handleFilter(e)}>Todas</button>
      <button className='font-semibold text-[#8c6acb] border border-[#767676] rounded-lg p-2' onClick={(e)=>handleFilter(e)}>Completadas</button>
      <button className='font-semibold text-[#8c6acb] border border-[#767676] rounded-lg p-2' onClick={(e)=>handleFilter(e)}>Pendientes</button>
      </div>
      
      <div className='p-10 flex md:flex-row flex-col justify-center md:justify-evenly'>
        <div className='w-auto h-auto max-h-screen overflow-visible md:overflow-x-hidden overflow-y-scroll flex-col'>

        {allTasks ? allTasks.map((task) => 
        ( 
        <div key={task._id} className='p-3'>
          {((filter=='Todas') | (task.completed === filter)) ? <Task title={task.title} description={task.description} createdAt={task.createdAt} completed={task.completed} _id={task._id}/> : ""}
        </div>
        )) : (<h1>Fetching data...</h1>)}

        </div>
        <div>
        <Form/>
        </div>
      </div>
      
    </div>) : (<ErrorMessage message={error.message}/>)}
    </div>
  )
}

export default HomePage