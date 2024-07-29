import React, { useContext, useEffect, useState } from 'react'
import EditableLabel from '../components/EditableLabel';
import { useParams } from 'react-router-dom';
import { authFetch } from '../../App';
import Checkbox from '../components/Checkedbox';
import UserContext from '../../UserContext';


function Content() {

  const [name, setName] = useState();
  const [color, setColor] = useState("#ff00ff");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);

  function notifyListUpdated(newName = undefined, newColor = undefined, newTasks = undefined) {
    console.log(user.lists);
    const listIndex = user.lists.findIndex((l) => (l.id == id));
    if(listIndex < 0) {
      console.log("Error: Current list not found in user! " + id);
      return;
    }
    const userCopy = {...user};
    userCopy.lists[listIndex].title = newName ? newName : name;
    userCopy.lists[listIndex].color = newColor ? newColor : color;
    console.log("Old items " + JSON.stringify(userCopy.lists[listIndex].items));
    userCopy.lists[listIndex].items = newTasks ? [...newTasks] : [...tasks];
    console.log("New items " + JSON.stringify(userCopy.lists[listIndex].items));

    setUser(userCopy);

  }



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
      const updatedTasks = t => [...t,data];
      setTasks(updatedTasks);
      notifyListUpdated(name, color, updatedTasks);
      setNewTask("");

    }
  }

  function deleteTask(id) {

    authFetch(`item/${id}`, 'DELETE').then(()=>{
      const updatedTasks = tasks.filter((i, _) => i.id !== id);
      setTasks(updatedTasks);
      notifyListUpdated(name, color, updatedTasks);
    }).catch(()=>{
      console.log('Brisanje nije uspjelo');
    })
  }

  function moveTaskUp(task) {
    if(task.orderIndex > 0) {

      const updatedTasks = [...tasks];
      const a = task.orderIndex;
      const b = task.orderIndex - 1;
      console.log("Move up A: " + a + " B: " + b);
      [updatedTasks[a].orderIndex, updatedTasks[b].orderIndex] = [updatedTasks[b].orderIndex, updatedTasks[a].orderIndex];
      [updatedTasks[a], updatedTasks[b]] = [updatedTasks[b], updatedTasks[a]];

      setTasks(updatedTasks);
      notifyListUpdated(name, color, updatedTasks);
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
      notifyListUpdated(name, color, updatedTasks);
      authFetch(`item/${task.id}/move/${b}`, 'PUT');
      
    }
  }

  function onTaskChange(taskToUpdate,text) {
    const updatedTask = {...taskToUpdate, text}
    const updatedTasks = tasks.filter(task => task.id !== taskToUpdate.id)

    updatedTasks.push(updatedTask)
    setTasks(updatedTasks)
    notifyListUpdated(name, color, updatedTasks);

    authFetch(`item/${taskToUpdate.id}`, 'PUT', updatedTask);
  }

  async function onNameChange(text) {
      setName(text);
  }

  function onNameEditDone(text) {
    if(text === undefined) {
      return;
    }
    console.log("On name edit done: " + text);

    if(text.trim() !== "") {
      authFetch(`list/${id}`, 'PUT', {"title": text, "color": color});
      notifyListUpdated(text, color, tasks);
    } 
  }

  function checkBoxChange(task, completed) {
    console.log("Checkbox changed to " + completed + " on " + task.text + " id " + task.id + " old task value " + task.completed);
    const updatedTask = {...task, completed}
    const updatedTasks = tasks.filter(oldTask => oldTask.id !== task.id)

    updatedTasks.push(updatedTask);
    setTasks(updatedTasks);
    authFetch(`item/${updatedTask.id}`, 'PUT', updatedTask);
    notifyListUpdated(name, color, updatedTasks);
  }
  

  return (
    <div className='flex h-dvh items-center justify-center pt-20 bg-yellow-200'>
      <div className="flex flex-col items-center justify-between w-auto h-auto p-10 rounded-xl bg-black">
        <div className='basis-1/3 flex flex-col items-center justify-center'>
          <div className='text-white'>
          <EditableLabel text={name} onTextChange={(text) => onNameChange(text)} onEditDone={onNameEditDone}/>
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
                  <Checkbox check={task.completed} onChange={(completed) => checkBoxChange(task, completed)} />
                </div>
                <div>
                  <EditableLabel text={task.text} onTextChange={(text) => onTaskChange(task,text)} />
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