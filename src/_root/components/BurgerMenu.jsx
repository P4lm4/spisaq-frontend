import React, { useState } from "react";
import { Link } from 'react-router-dom'

function BurgerMenu() {

    let [open, setOpen] = useState(false);
    const [ListofNotes, setListofNotes] = useState([{id: 1, name: "Posao"}, {id: 2, name: "Rekreacija"}, {id: 3, name: "Ishrana"}]);
    const Notes = ListofNotes.map((note) => <Link to={note.id}><p key={note.id}>{note.name}</p></Link>)

    return(
        <div>
            <div className="" >
                <div className="left-0 p-1 text-3xl cursor-pointer" onClick={() => setOpen(!open)}>
                    <ion-icon name={open ? "close-outline" : "menu-outline"}></ion-icon>
                </div>
                <div className="flex scroll-smooth">
                    {open && (
                        <ul className="text-base fixed flex flex-col items-start p-6 l-0 h-screen w-80 text-white bg-black">
                        {Notes}
                        </ul>
                    )}
                </div>
 
            </div>
            
        </div>


    )
}

export default BurgerMenu