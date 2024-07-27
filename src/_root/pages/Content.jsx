import React, { useEffect, useState } from 'react'
import EditableLabel from '../components/EditableLabel';
import { useParams } from 'react-router-dom';
import { authFetch } from '../../App';
import Checkbox from '../components/Checkedbox';


function Content() {

  const [name, setName] = useState();
  const [color, setColor] = useState("#ff00ff");
  const [completed, setCompleted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { id } = useParams();



  useEffect(() => {
    
    const fetchData = async () => { 
      const data = await authFetch(`list/${id}`)
      
      setName(data.title);
      setColor(data.color);
      setTasks(data.items);
      setCompleted(data.completed);

    }

    fetchData();

  }, [id])

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {

    if(newTask.trim() !== "") {
      const data = await authFetch('item', {"listId": id, "text": newTask, "color": color}, 'POST');
      setTasks(t => [...t,data]);
      setNewTask("");

    }
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((i, _) => i.id !== id);
    setTasks(updatedTasks);
    authFetch(`item/${id}`, null, 'DELETE');
    console.log(id);
  }

  function moveTaskUp(task) {
    if(task.orderIndex > 0) {

      const updatedTasks = [...tasks];
      const a = task.orderIndex;
      const b = task.orderIndex - 1;

      [updatedTasks[a].orderIndex, updatedTasks[b].orderIndex] = [updatedTasks[b].orderIndex, updatedTasks[a].orderIndex];
      [updatedTasks[a], updatedTasks[b]] = [updatedTasks[b], updatedTasks[a]];

      setTasks(updatedTasks);
      authFetch(`item/${task.id}/move/${b}`, null, 'PUT');
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
      authFetch(`item/${task.id}/move/${b}`, null, 'PUT');
      
    }
  }


  return (
    <div className='flex h-dvh items-center justify-center pt-20 bg-yellow-200'>
      <div className="flex flex-col items-center justify-between w-auto h-auto p-10 rounded-xl bg-black">
        <div className='basis-1/3 flex flex-col items-center justify-center'>
          <div className='text-white'>
          <EditableLabel text={name} />
          </div>
          <div className=''>
            <input className='rounded-sm' type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange} />
            <button className="bg-green-700 text-white rounded-sm m-2 px-1 font-bold" onClick={addTask}>Add</button>
          </div>
        </div>
        <div className='basis-2/3'>
          <ol className=''>
            {tasks.map((task, index) =>
              <li key={task.id} className='text-white flex flex-row items-center justify-between'>
                <div>
                  <Checkbox check={task.completed} />
                </div>
                <div>
                  <EditableLabel text={task.text} />
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