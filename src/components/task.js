import React, { useState } from 'react'
import { MdOutlineCircle, MdOutlineCheckCircleOutline, MdDelete, MdEdit   } from "react-icons/md";
import { deleteTask, update } from '@/services/taskService';
import { useContext } from 'react'
import { TaskContext } from '@/contexts/tasksContext'

function Task({title, description, createdAt, completed, _id}) {

    const {allTasks, setAllTasks, setPointedTask} = useContext(TaskContext);
    

    const [completeState, setCompleteState] = useState(completed);

    const handleChange = async () => {
        const response = await update(_id, {completed: !completeState})
        const updatedTask = {title: title, description: description, createdAt: createdAt, completed: !completeState, _id: _id}
        setCompleteState(!completeState)
        let newArray = [];
        for (var i=0; i < allTasks.length; i++){
            if (allTasks[i]._id == _id){
                newArray.push(updatedTask)
            } else {
                newArray.push(allTasks[i])
            }
        }

        setAllTasks(newArray);
        return await response
    }

    const handleDelete = async () => {
        const response = await deleteTask(_id);
        let newArray = [];

        for (var i=0; i < allTasks.length; i++){
            if (allTasks[i]._id !== _id){
                newArray.push(allTasks[i])
            }
        }

        setAllTasks(newArray);

        return await response;
    }

    const handleEdit = async () => {
        const task = {title: title, description: description, createdAt: createdAt, completed: completeState, _id: _id}
        setPointedTask(task)
    }

  return (
    <div className='min-w-80 max-w-96 min-h-52 max-h-96 bg-[#c3acd0] rounded-lg border border-[#d9d9d9] flex flex-col' style={!completeState ? ({backgroundColor: "#c3acd0"}) : ({backgroundColor: "#e3e3e3"})}>
        <div className='flex flex-row p-4'>
            <div className='flex justify-start p-2'>
            {completeState ? (<><MdOutlineCheckCircleOutline size={40} onClick={handleChange}/></>) : (<><MdOutlineCircle size={40} onClick={handleChange}/></>)}
            </div>
            <div className='flex-col justify-start pl-4 pt-4'>
            <h4 className="text-2xl font-semibold leading-snug pb-2 transform transition duration-500" style={completeState ? ({textDecoration: "line-through"}) : ({})}>{title}</h4>
            <h6 className='text-base font-normal' style={completeState ? ({textDecoration: "line-through"}) : ({})}>{description}</h6>
            <h6 className='text-xs pt-5'>{Date(createdAt)}</h6>
            </div>
        </div>
        <div className='flex flex-row pb-3 justify-end h-fit w-full'>
        <div className='pr-6 justify-start' onClick={handleEdit}>
            <MdEdit size={25}/>
            </div>
            <div className='pr-6 justify-start' onClick={handleDelete}>
            <MdDelete size={25}/>
            </div>
        </div>

    </div>
  )
}

export default Task