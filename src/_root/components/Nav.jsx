import React from "react";
import BurgerMenu from "./BurgerMenu";
import { Link } from 'react-router-dom'

function Nav () {

    return (
     <div className="fixed z-50 inset-x-0 top-0 w-full bg-black flex items-center justify-between">
        <div className="flex flex-row items-center font-bold text-2xl cursor-pointer text-slate-200">
            <BurgerMenu />
            <Link className="flex justify-center items-center" to="/">
                <span className="mr-1 text-3xl text-amber-400">
                    <ion-icon name="clipboard-outline"></ion-icon>
                </span>
                Spisaq
            </Link>
        </div>
        <div className="flex flex-row items-center justify-end font-bold text-white">
            <div className="text-sm flex-col items-center justify-center mr-2">
                <p>
                    Nick
                </p>
                <p>
                    <a href="http://localhost:5175/auth" className="hover:text-gray-300 duration-500">Sign out</a>
                </p>
            </div>
            <div className="text-4xl text-amber-400 mx-1 pt-2">
                <ion-icon name="person-circle-outline"></ion-icon>
            </div>
        </div>
    </div>
    )
}

export default Nav