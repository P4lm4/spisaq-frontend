import React from "react";

function Nav () {

    return (
        <div className="w-full fixed top-0 left-0">
            <div className="bg-black flex items-center justify-between">
                <div className="font-bold text-2xl cursor-pointer text-slate-200">
                    <a className="flex justify-center items-center" href="/">
                        <span className="mr-1 text-3xl text-amber-400">
                            <ion-icon name="clipboard-outline"></ion-icon>
                        </span>
                        Spisaq
                    </a>
                </div>
                <div className="flex flex-row items-center font-bold text-white">
                    <div className="text-sm flex-col items-center justify-center mr-2">
                        <p>
                            Nick
                        </p>
                        <p>
                            <a href="" className="hover:text-gray-300 duration-500">Sign out</a>
                        </p>
                    </div>
                    <div className="text-4xl text-amber-400 mx-1 pt-2">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav