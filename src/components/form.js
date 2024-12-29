import React from 'react'
import { create, update } from '@/services/taskService'
import { useContext } from 'react'
import { TaskContext } from '@/contexts/tasksContext'


function Form() {

    
    const {allTasks, setAllTasks, pointedTask, setPointedTask, setError} = useContext(TaskContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const title = e.target[0].value;
            const description = e.target[1].value;

            if(title==""){
             setError({message: "El titulo es obligatorio"});
             return; 
            }

            if (pointedTask!==undefined){
                const task = {title: title, description: description, createdAt: pointedTask.createdAt, completed: pointedTask.completed, _id: pointedTask._id}
                const response = await update(pointedTask._id, task)
                const data = await response
                const updatedTask = data.task
                var newArray = []
                allTasks.map((task)=> {
                    if (task._id == updatedTask._id){
                        newArray.push(updatedTask)
                    } else {
                        newArray.push(task)
                    }
                    
                })
                setAllTasks(newArray)
                setPointedTask(undefined)
                return data }
             else {
                const response = await create({title: title, description: description})
                const data = await response
                const newTask = data.task
                setAllTasks([...allTasks, newTask])
                return await data
            }
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='flex flex-col items-center md:pt-0 pt-10'>
    <div className="text-center text-[#7743db] text-4xl font-bold leading-9 p-5">{!pointedTask ? "Nueva tarea" : "Editando tarea..."}</div>
        <div className='w-72 h-80 bg-white rounded-lg border border-[#d9d9d9] min-h-fit'>
        <form className='flex flex-col pt-10 p-5 text-base font-normal gap-8' onSubmit={(e) => handleSubmit(e)}>
            <div>
            <label>Title</label>
            <input className='rounded-lg border border-[#d9d9d9] h-8 pl-2 w-full' placeholder='Value' defaultValue={pointedTask==undefined ? "" : pointedTask.title} />
            </div>
            <div>
            <label>Description</label>
            <textarea className='rounded-lg border border-[#d9d9d9] h-16 pl-2 w-full break-words' placeholder='Value' defaultValue={pointedTask==undefined ? "" : pointedTask.description}/>
            </div>
            <div>
                <button className='w-full h-10 p-3 bg-[#c3acd0] rounded-lg border border-[#c3acd0] justify-center items-center gap-2 flex overflow-hidden text-white hover:scale-105 transition ease-in-out delay-100' type='submit'> Submit </button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Form