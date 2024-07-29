import React, { useContext, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { Link, useNavigate } from 'react-router-dom'
import UserContext from "../../UserContext";
import { setToken } from "../../App";

function Nav () {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    console.log(user);

    function signOut() {
        console.log("Sign Out");
        setToken(null);
        setUser(null);
       // navigate('/auth');
    }

    return (
     <div className="fixed z-50 inset-x-0 top-0 w-full bg-black flex items-center justify-between">
        <div className="flex flex-row items-center font-bold text-2xl cursor-pointer text-slate-200">
            <BurgerMenu />
            <Link className="flex justify-center items-center" to="/">
                <span className="mr-1 text-3xl text-amber-400">
                    <ion-icon name="clipboard-outline"></ion-icon>
                </span>
                Spisa<span className="text-yellow-400">q</span>
            </Link>
        </div>
        <div className="flex flex-row items-center justify-end font-bold text-white">
            <div className="text-sm flex-col items-center justify-center mr-2">
                <p>
                    {user.username}
                </p>
                <p>
                    <Link onClick={signOut} to="/auth" className="hover:text-gray-300 duration-500">Sign out</Link>
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