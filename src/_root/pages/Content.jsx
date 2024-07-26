import React, { useEffect, useState } from 'react'
import EditableLabel from '../components/EditableLabel';
import { useParams } from 'react-router-dom';
import { authFetch } from '../../App';

/*
async function createList(name, color) {
  requestData = {
    "title": name,
    "color": color
  };
  return fetch('http://localhost:8080/api/list', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestData)
  })
    .then(data => data.json())
    .catch(err => console.log(err))
}
*/

// authFetch('list', {"title": name, "color": color}, 'POST')
/*
async function addItem(id, name) {
  requestData = {
    "id": id,
    "name": name
  }
  return fetch('http://localhost:8080/api/item', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestData)
  })
}
*/

function Content() {

  const [name, setName] = useState();
  const [color, setColor] = useState("#ff00ff");
  const [completed, setCompleted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { id } = useParams();
  const [listId, setListId] = useState();

  useEffect(() => {
    setListId(id);
  }, [id])

  

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {

    if(newTask.trim() !== "") {
      authFetch('item', {"id": listId, "title": name, "color": color}, 'POST');
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

  function sumbitChecbox() {
    setCompleted(true);
  }


  return (
    <div className='flex h-dvh items-center justify-center pt-20 bg-yellow-200'>
      <div className="flex flex-col items-center justify-between w-auto h-auto p-10 rounded-xl bg-black">
        <div className='basis-1/3 flex flex-col items-center justify-center'>
          <div className='text-white'>
          <EditableLabel text={{name} + {listId}} />
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
                <input className='m-2' type='checkbox' onClick={sumbitChecbox} />
                <div className=''>
                  <EditableLabel text={task} />
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
    </div>

  )
}

export default Content