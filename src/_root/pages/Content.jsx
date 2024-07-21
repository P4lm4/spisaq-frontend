import React, { useState } from 'react'

function Content() {

  const [tasks, setTasks] = useState(["Eat breakfest", "Take a shower", "Feed a dog"]);
  const [newTask, setNewTask] = useState("");
  const [changeInputType, setChangeInputType] = useState(false);
  const [name, setName] = useState("Name of list");
  const [newName, setNewName] = useState("");

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

  function handleInputChangeName(event) {
    setName(event.target.value);
  }

  function changeName() {

    document.getElementById("name").type = "text";
    document.getElementById("name").value = "";
    document.getElementById("name").className = "bg-white text-black font-bold rounded-sm";
    
    setChangeInputType(true);
  }

  function confirmName() {

    if(newName.trim() !== "") {
      setName(n => [...n,newName]);
      setNewName("");
    }
    else {
      setName(name);
    }
    
    document.getElementById("name").type = "button";
    document.getElementById("name").value = {name};
    document.getElementById("name").className = "bg-black text-white font-bold rounded-sm";

    setChangeInputType(false);
    
  }


  return (
    <div className="flex flex-col items-center justify-center w-96 h-96 rounded-xl bg-black">
      <div className='flex items-center justify-between'>
        <input id="name" type="button" value={name} onClick={changeName} onChange={handleInputChangeName} className='bg-black text-white font-bold rounded-sm'></input>
        {changeInputType && (<button className="bg-green-700 text-white rounded-sm m-2 px-1 font-bold" onClick={confirmName}>Edit</button>)}
      </div>


      <div className='flex items-center justify-between'>
        <input className='rounded-sm' type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange}/>
        <button className="bg-green-700 text-white rounded-sm m-2 px-1 font-bold" onClick={addTask}>Add</button>
      </div>

      <ol className='flex flex-col items-center justify-between'>
        {tasks.map((task, index) =>
          <li key={index} className='text-white flex flex-row items-center justify-center'>
            <div className='flex justify-start'>
              <span className='text-white'>{task}</span>
            </div>
            <div className=''>
              <button className='bg-red-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => deleteTask(index)}>Delete</button>
              <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskUp(index)}>Up</button>
              <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskDown(index)}>Down</button>
            </div>
 
          </li>)}
      </ol>
      
    </div>
  )
}

export default Content