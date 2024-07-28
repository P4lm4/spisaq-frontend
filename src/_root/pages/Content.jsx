import React, { useEffect, useState } from 'react'
import EditableLabel from '../components/EditableLabel';
import { useParams } from 'react-router-dom';
import { authFetch } from '../../App';
import Checkbox from '../components/Checkedbox';


function Content() {

  const [name, setName] = useState();
  const [color, setColor] = useState("#ff00ff");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { id } = useParams();



  useEffect(() => {
    
    const fetchData = async () => { 
      const data = await authFetch(`list/${id}`)
      
      setName(data.title);
      setColor(data.color);
      setTasks(data.items);

    }

    fetchData();

  }, [id])

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {

    if(newTask.trim() !== "") {
      const data = await authFetch('item', 'POST', {"listId": id, "text": newTask, "color": color});
      setTasks(t => [...t,data]);
      setNewTask("");

    }
  }

  function deleteTask(id) {

    authFetch(`item/${id}`, 'DELETE').then(()=>{
      const updatedTasks = tasks.filter((i, _) => i.id !== id);
      setTasks(updatedTasks);
    }).catch(()=>{
      console.log('Brisanje nije uspjelo');
    })
  }

  function moveTaskUp(task) {
    if(task.orderIndex > 0) {

      const updatedTasks = [...tasks];
      const a = task.orderIndex;
      const b = task.orderIndex - 1;

      [updatedTasks[a].orderIndex, updatedTasks[b].orderIndex] = [updatedTasks[b].orderIndex, updatedTasks[a].orderIndex];
      [updatedTasks[a], updatedTasks[b]] = [updatedTasks[b], updatedTasks[a]];

      setTasks(updatedTasks);
      authFetch(`item/${task.id}/move/${b}`, 'PUT');
    }
  }

  function moveTaskDown(task) {
    if(task.orderIndex < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const a = task.orderIndex;
      const b = task.orderIndex + 1;

      [updatedTasks[a].orderIndex, updatedTasks[b].orderIndex] = [updatedTasks[b].orderIndex, updatedTasks[a].orderIndex];
      [updatedTasks[a], updatedTasks[b]] = [updatedTasks[b], updatedTasks[a]];

      setTasks(updatedTasks);
      authFetch(`item/${task.id}/move/${b}`, 'PUT');
      
    }
  }

  function onTaskChange(taskToUpdate,text) {
    const updatedTask = {...taskToUpdate, text}
    const updatedTasks = tasks.filter(task => task.id !== taskToUpdate.id)

    updatedTasks.push(updatedTask)
    setTasks(updatedTasks)

    authFetch(`item/${taskToUpdate.id}`, 'PUT', updatedTask);
  }

  async function onNameChange(text) {
    if(text.trim() !== "") {
      setName(text);
      authFetch(`list/${id}`, 'PUT', {"title": text, "color": "#ff00ff"});
    }
  }

  

  return (
    <div className='flex h-dvh items-center justify-center pt-20 bg-yellow-200'>
      <div className="flex flex-col items-center justify-between w-auto h-auto p-10 rounded-xl bg-black">
        <div className='basis-1/3 flex flex-col items-center justify-center'>
          <div className='text-white'>
          <EditableLabel text={name} onTextChange={(text) => onNameChange(text)}/>
          </div>
          <div className=''>
            <input className='rounded-sm' type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange} />
            <button className="bg-green-700 text-white rounded-sm m-2 px-1 font-bold" onClick={addTask}>Add</button>
          </div>
        </div>
        <div className='basis-2/3'>
          <ol className=''>
            {tasks.sort((t1,t2)=> t1.orderIndex - t2.orderIndex).map((task, index) =>
              <li key={task.id} className='text-white flex flex-row items-center justify-between'>
                <div>
                  <Checkbox check={task.completed} />
                </div>
                <div>
                  <EditableLabel text={task.text} onTextChange={(text) => onTaskChange(task,text)}/>
                </div>
                <div className='px-2'>
                  <button className='bg-red-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => deleteTask(task.id)}>Delete</button>
                  <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskUp(task)}>Up</button>
                  <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskDown(task)}>Down</button>
                </div>
              </li>)}
          </ol>
        </div>
      </div>
    </div>

  )
}

export default Content