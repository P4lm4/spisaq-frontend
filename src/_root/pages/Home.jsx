import React from "react";
import CardNote from "../components/CardNote";
import { Link } from "react-router-dom";

function Home() {

    return(
        <div className="flex flex-wrap items-center justify-around p-16 bg-yellow-200">
            <Link to="content/new"> 
                <div className="flex items-center justify-center w-60 h-80 rounded-xl text-3xl text-white shadow p-5 m4 bg-black cursor-pointer">
                    <ion-icon name="add-outline"></ion-icon>             
                </div>
            </Link>

            <CardNote id={1} title='Shoping' items="Neka stavka"/>
            <CardNote id={2} title='Gym' items="Neka stavka" />
            <CardNote id={3} title='Work' items="Neka stavka" />
            <CardNote id={4} title='Football' items="Neka stavka" />
            <CardNote id={5} title='Sport' items="Neka stavka" />
        </div>
    )
}

export default Home