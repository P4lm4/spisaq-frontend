import React, { useState } from "react";

function BurgerMenu() {

    let [open, setOpen] = useState(false);
    

    return(
        <div>
            <div className="mt-12 p-1 text-3xl cursor-pointer" onClick={() => setOpen(!open)}>
                <ion-icon name={open ? "close-outline" : "menu-outline"}></ion-icon>   
            </div>
            <ul className={""}>
                SPISAQ
            </ul>
        </div>


    )
}

export default BurgerMenu