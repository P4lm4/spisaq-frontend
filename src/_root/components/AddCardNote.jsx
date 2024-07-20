import React from "react";
import { Link } from "react-router-dom"

function AddCardNote() {

    return(
        <Link to="content"> 
        <div className="flex items-center justify-center w-60 h-80 rounded-xl text-3xl text-white shadow p-5 m4 bg-black cursor-pointer">
            <ion-icon name="add-outline"></ion-icon>             
        </div>
        </Link>
    )
}

export default AddCardNote