import React, { useState , useContext} from "react";
import { Link } from 'react-router-dom'
import UserContext from "../../UserContext";

function BurgerMenu() {

    let [open, setOpen] = useState(false);
    const { lists } = useContext(UserContext);


    return(
        <div>
                <div className="left-0 p-1 text-3xl cursor-pointer" onClick={() => setOpen(!open)}>
                    <ion-icon name={open ? "close-outline" : "menu-outline"}></ion-icon>
                </div>
                <div className="flex scroll-smooth">
                    {open && (
                        <ul className="text-base fixed flex flex-col items-start p-6 l-0 h-screen w-80 text-white bg-black">
                            {lists.map((item) => <Link key={item.id} to={`/content/${item.id}`}><li>{item.title}</li></Link>)}
                        </ul>
                    )}
                </div>
        </div>
    )
}

export default BurgerMenu