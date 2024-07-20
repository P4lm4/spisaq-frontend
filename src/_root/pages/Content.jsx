import React, { useState } from 'react'

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
    <div className="flex flex-col items-center justify-center w-96 h-96 rounded-xl bg-black">

      <h1 className='text-white font-bold'>To-Do-List</h1>

      <div>
        <input className='rounded-sm' type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange}/>
        <button className="bg-green-700 text-white rounded-sm m-2 px-1 font-bold" onClick={addTask}>Add</button>
      </div>

      <ol>
        {tasks.map((task, index) =>
          <li key={index} className='text-white'>
            <span className='text-white'>{task}</span> 
            <button className='bg-red-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => deleteTask(index)}>Delete</button>
            <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskUp(index)}>Up</button>
            <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskDown(index)}>Down</button>
          </li>)}
      </ol>
      
    </div>
  )
}

export default Content