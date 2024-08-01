import React, { useContext, useState } from "react";
import EditableLabel from "../components/EditableLabel";
import { useParams } from "react-router-dom";
import { authFetch } from "../../App";
import Checkbox from "../components/Checkedbox";
import UserContext from "../../UserContext";

function Content() {
  const [newTask, setNewTask] = useState("");
  const [color, setColor] = useState("#ff00ff");
  const { id } = useParams();
  const { lists, refreshLists } = useContext(UserContext);

  const openList = lists?.find((list) => list.id.toString() === id);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {
    if (newTask.trim() !== "") {
      authFetch("item", "POST", {
        listId: id,
        text: newTask,
        color: color,
      }).then(() => {
        refreshLists();
      });
    }
    setNewTask("");
  }

  function deleteTask(id) {
    authFetch(`item/${id}`, "DELETE")
      .then(() => {
        refreshLists();
      })
      .catch(() => {
        console.log("Brisanje nije uspjelo");
      });
  }

  function moveTaskUp(item) {
    if (item.orderIndex > 0) {
      const b = item.orderIndex - 1;
      authFetch(`item/${item.id}/move/${b}`, "PUT").then(() => {
        refreshLists();
      });
    }
  }

  function moveTaskDown(item) {
    if (item.orderIndex + 1 < openList?.items?.length) {
      const b = item.orderIndex + 1;
      authFetch(`item/${item.id}/move/${b}`, "PUT").then(() => {
        refreshLists();
      });
    }
  }

  function checkBoxChange(item, completed) {
    const updatedItem = { ...item, completed };
    authFetch(`item/${item.id}`, "PUT", updatedItem).then(() => {
      refreshLists();
    });
  }

  function updateListName(list, title) {
    const updatedList = { ...list, title };
    authFetch(`list/${list.id}`, "PUT", updatedList).then(() => {
      refreshLists();
    });
  }

  function updateItemTitle(item, text) {
    const updatedItem = { ...item, text };
    authFetch(`item/${item.id}`, "PUT", updatedItem).then(() => {
      refreshLists();
    });
  }

  return (
    <div className="flex h-dvh items-center justify-center pt-20">
      <div className="flex min-w-12 flex-col items-center justify-between p-10 m-2 rounded-xl bg-black">
        <div className="basis-1/3 min-w-12 flex flex-col items-center justify-center">
          <div className="text-white text-xl border-b-2 border-yellow-400 w-full text-center py-2">
            <EditableLabel
              text={openList.title}
              onEditDone={(newTitle) => updateListName(openList, newTitle)}
            />
          </div>
          <div className="py-1 flex my-4 items-center">
            <input
              className="h-8 m-1 text-black p-1 opacity-90 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              type="text"
              placeholder="Enter a task..."
              value={newTask}
              onChange={handleInputChange}
            />
            <button
              className="bg-green-700 hover:scale-110 duration-200 transform text-white rounded-sm m-2 px-2 pt-1 font-bold text-xl"
              onClick={addTask}
            >
              <ion-icon name="add-circle-outline"></ion-icon>
            </button>
          </div>
        </div>
        <div className="basis-2/3">
          <ol className="">
            {openList?.items
              ?.sort((t1, t2) => t1.orderIndex - t2.orderIndex)
              .map((item, index) => (
                <li
                  key={item.id}
                  className="text-white flex flex-row items-center justify-between gap-8 border-b-stone-500 border-b-2 border-opacity-30"
                >
                  <div>
                    <Checkbox
                      check={item.completed}
                      onChange={(completed) => checkBoxChange(item, completed)}
                    />
                  </div>
                  <div className="flex flex-1">
                    <EditableLabel
                      text={item.text}
                      completed={item.completed}
                      onEditDone={(newTitle) => updateItemTitle(item, newTitle)}
                    />
                  </div>
                  <div className="px-2 flex ">
                    <button
                      className="bg-red-700 hover:scale-110 duration-200 text-white rounded-sm m-1 px-2 pt-1 font-bold"
                      onClick={() => deleteTask(item.id)}
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                    <button
                      className="bg-blue-700 hover:scale-110 duration-200 text-white rounded-sm m-1 px-2 pt-1 font-bold"
                      onClick={() => moveTaskUp(item)}
                    >
                      <ion-icon name="chevron-up-outline"></ion-icon>
                    </button>
                    <button
                      className="bg-blue-700 hover:scale-110 duration-200 text-white rounded-sm m-1 px-2 pt-1 font-bold flex items-center"
                      onClick={() => moveTaskDown(item)}
                    >
                      <ion-icon name="chevron-down-outline"></ion-icon>
                    </button>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Content;
