import React from "react";
import { Link } from "react-router-dom";

function CardNote(props) {


    return(
        <Link to={`/content/${props.list.id}`}>
            <div className="flex flex-col items-center justify-center m-1 w-60 h-80 rounded-xl text-white shadow p-3 bg-black opacity-90">
                <div className="basis-1/4 flex items-center justify-center">
                    <p>{props.list.title}</p>
                </div>
                <div className="basis-3/4 items-start p-3 justify-around bg-white opacity-80 rounded-xl w-full text-black">
                    <ul className="text-wrap">
                        {props.list.items.map((i, index) => <li key={i.id}>{i.completed ? "✅" : "⬛"}{i.text}</li>)}
                    </ul>
                </div>
            </div>
        </Link>

    )
}

export default CardNote