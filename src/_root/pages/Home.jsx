import React, { useContext, useState } from "react";
import CardNote from "../components/CardNote";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import { authFetch } from "../../App";



function Home() {

    const { user, setUser } = useContext(UserContext);
    const [ lists, setLists] = useState((user != undefined && user.lists != undefined) ? user.lists : []);


    // Fetch user and then setUser, setLists, beacuse if userContext are undefined.
    if(user === undefined || user.lists === undefined) {
        fetchUser();
    }

    async function fetchUser() {
        const data = await authFetch('user/myself');
        setUser(data);
        setLists(data.lists);
    }
    
    const Lists = lists.map((list, index) => <CardNote key={list.id} list={list} />)

    return(
        <div className="flex flex-wrap items-center justify-around p-16 h-dvh bg-yellow-200">
            <Link to="content/undefined"> 
                <div className="flex items-center justify-center w-60 h-80 rounded-xl text-3xl text-white shadow p-5 m4 bg-black cursor-pointer">
                    <ion-icon name="add-outline"></ion-icon>             
                </div>
            </Link>

            {Lists}
            
        </div>
    )
}

export default Home