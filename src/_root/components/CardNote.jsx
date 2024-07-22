import React from "react";
import { Link } from "react-router-dom";

function CardNote(props) {


    return(
        <Link to={`/content/${props.id}`}>
            <div className="flex flex-col items-center justify-center m-1 w-60 h-80 rounded-xl text-white shadow p-3 bg-black opacity-90">
                <div className="basis-1/4 flex items-center justify-center">
                    <p>{props.title}</p>
                </div>
                <div className="basis-3/4 items-start p-3 justify-around bg-white opacity-80 rounded-3xl w-full text-black">
                    <p className="text-wrap">
                        {props.items}
                    </p>
                </div>
            </div>
        </Link>

    )
}

export default CardNote