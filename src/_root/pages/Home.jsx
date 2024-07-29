import React, { useContext } from "react";
import CardNote from "../components/CardNote";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import { authFetch } from '../../App';



function Home() {

    const { user, setUser, filteredList } = useContext(UserContext);

    const navigate = useNavigate();

    async function createList() {
        const data = await authFetch('list', 'POST', {"title": "New List", "color": "#ff00ff"});
        const userCopy = {...user};
        userCopy.lists.push(data);
        setUser(userCopy);
        //setLists(t => [...t, data]);
        navigate(`content/${data.id}`);
        console.log(data);
    }
    
    return(
        <div className="flex flex-wrap items-center justify-around p-16 h-dvh bg-yellow-200  overflow-y-auto">
             
                <button onClick={createList} className="flex items-center justify-center w-60 h-80 rounded-xl text-3xl text-white shadow p-5 m4 bg-black cursor-pointer">
                    <ion-icon name="add-outline"></ion-icon>             
                </button>
            {filteredList?.map((list, index) => <CardNote key={list.id} list={list} />)}
        </div>
    )
}

export default Home