import React, { useState } from 'react'
import EditableLabel from '../components/EditableLabel';

function Content() {

  const [tasks, setTasks] = useState(["Eat breakfest", "Take a shower", "Feed a dog"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {

  if(newTask.trim() !== "") {
    setTasks(t => [...t,newTask]);
    setNewTask("");
  }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if(index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], [updatedTasks[index]]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if(index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]
      setTasks(updatedTasks);
    }
  }


  return (
    <div className="flex flex-col items-center justify-between w-auto h-auto p-10 rounded-xl bg-black">
      
      <div className='basis-1/3 flex flex-col items-center justify-center'>
        <div className='text-white'>
        <EditableLabel />
        </div>

        <div className=''>
          <input className='rounded-sm' type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange} />
          <button className="bg-green-700 text-white rounded-sm m-2 px-1 font-bold" onClick={addTask}>Add</button>
        </div>
      </div>

      <div className='basis-2/3'>
        <ol className=''>
          {tasks.map((task, index) =>
            <li key={index} className='text-white flex flex-row items-center justify-between'>
              <div className=''>
                <span className='text-white'>{task}</span>
              </div>
              <div className='px-2'>
                <button className='bg-red-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => deleteTask(index)}>Delete</button>
                <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskUp(index)}>Up</button>
                <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskDown(index)}>Down</button>
              </div>
            </li>)}
        </ol>
      </div>

      
    </div>
  )
}

export default Content