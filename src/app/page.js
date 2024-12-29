"use client"
import { use, useEffect, useState } from "react";
import { TaskContext } from "@/contexts/tasksContext";
import HomePage from "@/components/homepage";
import Task from "@/components/task";
import { getAll } from '@/services/taskService';


export default function Home() {

  const [error, setError] = useState()
  const [pointedTask, setPointedTask] = useState()
  const [allTasks, setAllTasks] = useState();
  const [filter, setFilter] = useState('Todas')

  useEffect(()=>{
    const getAllTasks = async () => {
      const tasks = await getAll();
      setAllTasks(tasks.tasks);
    }

    getAllTasks()
  }, [])

  return (
    <TaskContext.Provider  value={{allTasks, setAllTasks, pointedTask, setPointedTask, error, setError, filter, setFilter}}>
      <HomePage/>
    </TaskContext.Provider>
  );
}
