import React, { useContext } from "react";
import CardNote from "../components/CardNote";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import { authFetch } from '../../App';



function Home() {

    const { user, setUser, filteredList, refreshLists } = useContext(UserContext);

    const navigate = useNavigate();

    async function createList() {
        const data = await authFetch('list', 'POST', {"title": "New List", "color": "#ff00ff"})
        await refreshLists();
        navigate(`content/${data.id}`);
    }
    
    return(
    <div className="flex flex-wrap items-center justify-around p-16 h-dvh  overflow-y-auto">
        <button onClick={createList} className="flex items-center justify-center w-60 h-80 rounded-xl text-3xl text-white shadow p-5 m4 bg-black cursor-pointer hover:bg-stone-800">
            <ion-icon name="add-outline"></ion-icon>             
        </button>
        {filteredList?.map((list, index) => <CardNote key={list.id} list={list} />)}
    </div>
    )
}

export default Home