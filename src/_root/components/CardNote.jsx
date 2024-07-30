import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authFetch } from '../../App';
import UserContext from "../../UserContext";


function CardNote(props) {

    const { refreshLists } = useContext(UserContext)

    function deleteList() {
        authFetch(`list/${props.list.id}`, 'DELETE').then(()=>{
            refreshLists()
          }).catch(()=>{
            console.log('Brisanje nije uspjelo');
          })
    }


    return(
        
            <div className="flex flex-col items-center justify-center m-1 w-60 h-80 rounded-xl text-white shadow p-3 bg-black opacity-90">
                <div className="basis-1/4 flex items-center justify-center w-full">
                    <div className="basis-11/12 flex items-center justify-center">
                        <p>{props.list.title}</p>
                    </div>
                    <div className="basis-1/12 pr-1">
                        <button className="bg-red-700 hover:scale-110 duration-200 text-white rounded-sm px-2 pt-1 font-bold" onClick={deleteList}><ion-icon name="trash-bin-outline"></ion-icon></button>
                    </div>
                </div>

                <Link to={`/content/${props.list.id}`} className="basis-3/4 items-start p-3 justify-around bg-white opacity-80 rounded-xl w-full text-black">
                    <ul className="text-wrap">
                        {props.list.items.sort((t1,t2)=> t1.orderIndex - t2.orderIndex).map((i, index) => <li key={i.id}>{i.completed ? "✅" : "⬛"}{i.text}</li>)}
                    </ul>
                </Link>
            </div>
        

    )
}

export default CardNote