import React, { useContext, useEffect, useState } from 'react'
import EditableLabel from '../components/EditableLabel';
import { useParams } from 'react-router-dom';
import { authFetch } from '../../App';
import Checkbox from '../components/Checkedbox';
import UserContext from '../../UserContext';


function Content() {
  const [newTask, setNewTask] = useState('');
  const [color, setColor] = useState("#ff00ff");
  const { id } = useParams();
  const { user, setUser, lists, refreshLists } = useContext(UserContext);

  const openList = lists?.find(list=>  list.id.toString() === id)

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {
    if(newTask.trim() !== "") {
      authFetch('item', 'POST', {"listId": id, "text": newTask, "color": color}).then(()=>{
        refreshLists()
      })
    }
  }

  function deleteTask(id) {
    authFetch(`item/${id}`, 'DELETE').then(()=>{
      refreshLists()
    }).catch(()=>{
      console.log('Brisanje nije uspjelo');
    })
  }

  function moveTaskUp(item) {
    if(item.orderIndex > 0) {
      const b = item.orderIndex - 1;
      authFetch(`item/${item.id}/move/${b}`, 'PUT').then(()=>{
        refreshLists()
      });
    }
  }

  function moveTaskDown(item) {
    if(item.orderIndex+1 < openList?.items?.length) {
      const b = item.orderIndex + 1;
      authFetch(`item/${item.id}/move/${b}`, 'PUT').then(()=>{
        refreshLists()
      })
    }
  }

  function checkBoxChange(item, completed) {
    const updatedItem = {...item, completed}
    authFetch(`item/${item.id}`, 'PUT', updatedItem).then(()=>{
      refreshLists()
    })
  }

    function updateListName(list, title) {
      const updatedList = {...list, title}
      authFetch(`list/${list.id}`, 'PUT', updatedList).then(()=>{
        refreshLists()
      });
  }

  function updateItemTitle(item, text) {
    const updatedItem = {...item, text}
    authFetch(`item/${item.id}`, 'PUT', updatedItem).then(()=>{
      refreshLists()
    });
}

  return (
    <div className='flex h-dvh items-center justify-center pt-20 bg-yellow-200'>
      <div className="flex flex-col items-center justify-between w-auto h-auto p-10 rounded-xl bg-black">
        <div className='basis-1/3 flex flex-col items-center justify-center'>
          <div className='text-white'>
          <EditableLabel text={openList.title} onEditDone={(newTitle)=> updateListName(openList,newTitle)}/>
          </div>
          <div className=''>
            <input className='rounded-sm' type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange} />
            <button className="bg-green-700 text-white rounded-sm m-2 px-1 font-bold" onClick={addTask}>Add</button>
          </div>
        </div>
        <div className='basis-2/3'>
          <ol className=''>
            {openList?.items?.sort((t1,t2)=> t1.orderIndex - t2.orderIndex).map((item, index) =>
              <li key={item.id} className='text-white flex flex-row items-center justify-between'>
                <div>
                  <Checkbox check={item.completed} onChange={(completed) => checkBoxChange(item, completed)} />
                </div>
                <div>
                  <EditableLabel text={item.text}  onEditDone={(newTitle)=> updateItemTitle(item, newTitle)}/>
                </div>
                <div className='px-2'>
                  <button className='bg-red-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => deleteTask(item.id)}>Delete</button>
                  <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskUp(item)}>Up</button>
                  <button className='bg-blue-700 text-white rounded-sm m-1 px-1 font-bold' onClick={() => moveTaskDown(item)}>Down</button>
                </div>
              </li>)}
          </ol>
        </div>
      </div>
    </div>

  )
}

export default Content