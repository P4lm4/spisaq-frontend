import React, { useState } from "react";

function BurgerMenu() {

    let [open, setOpen] = useState(false);
    const [ListofNotes, setListofNotes] = useState([{id: 1, name: "Posao", date: "12-04-2022"}, {id: 2, name: "Rekreacija", date: "12-04-2022"}, {id: 3, name: "Ishrana", date: "12-04-2022"}]);
    const Notes = ListofNotes.map((note) => <li><a href={note.id}>{note.name} {note.date}</a></li>)

    return(
        <div>
            <div className="" >
                <div className="left-0 w-10 mt-12 p-1 text-3xl cursor-pointer" onClick={() => setOpen(!open)}>
                    <ion-icon name={open ? "close-outline" : "menu-outline"}></ion-icon>
                </div>
                <div className="flex scroll-smooth">
                    {open && (
                        <ul className="fixed flex flex-col items-start justify-between p-6 ml-4 rounded-xl text-black bg-yellow-400 bg-opacity-95">
                        {Notes}
                        </ul>
                    )}
                </div>
 
            </div>
            
        </div>


    )
}

export default BurgerMenu