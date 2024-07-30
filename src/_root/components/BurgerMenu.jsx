import React, { useState , useContext} from "react";
import { Link } from 'react-router-dom'
import UserContext from "../../UserContext";

function BurgerMenu() {

    let [open, setOpen] = useState(false);
    const { user } = useContext(UserContext);


    return(
        <div>
                <div className="left-0 p-1 text-3xl cursor-pointer" onClick={() => setOpen(!open)}>
                    <ion-icon name={open ? "arrow-back-outline" : "menu-outline"}></ion-icon>
                </div>
                <div className="flex scroll-smooth" >
                    {open && (
                        
                        <ul className="text-base fixed flex flex-col items-start p-6 l-0 h-screen w-80 text-white bg-black">
                            <Link className="py-1 pr-2 mb-2 hover:p-1 hover:bg-yellow-600 hover:rounded-md hover:border-collapse active:bg-yellow-500 border-b-amber-400 border-b-2 w-full gap-2 flex items-center" onClick={() => setOpen(!open)}  to="/">
                                <ion-icon name="copy-outline"></ion-icon>
                                <span>Home</span>
                            </Link>
                            {user.lists.map((item) => 
                            <Link className="hover:bg-yellow-600 rounded-md active:bg-yellow-500 hover:pr-2 p-1 mr-4" onClick={() => setOpen(!open)} key={item.id}  to={`/content/${item.id}`}>
                                <li className="my-1 flex items-center gap-2 text-ellipsis" >
                                    <ion-icon className="pr-2" name="clipboard-outline"></ion-icon>
                                    <span className="text-ellipsis overflow-hidden w-64">{item.title}</span>
                                </li>
                            </Link>)}
                        </ul>
                    )}
                </div>
        </div>
    )
}

export default BurgerMenu