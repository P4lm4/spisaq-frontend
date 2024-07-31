import React, { useState , useContext, useRef, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'
import UserContext from "../../UserContext";

function BurgerMenu() {

    let [open, setOpen] = useState(false);
    const { user } = useContext(UserContext);
    const sideBar = useRef();
    const navigate = useNavigate();

    
    useEffect(() => {
        if(open) {
            sideBar.current.focus();
        }
    }, [open])

    function onMenuClick(item) {
        if(item) {
            navigate(`/content/${item.id}`)
        } else {
            navigate(`/`)
        }
        setOpen(false);
    }


    
    

    return(
        <div>
            <div className="left-0 p-1 text-3xl cursor-pointer" onClick={() => setOpen(!open)}>
                <ion-icon name={open ? "arrow-back-outline" : "menu-outline"}></ion-icon>
            </div>
            
                {open && (      
                    <div className="flex scroll-smooth" ref={sideBar} tabIndex={0} onBlur={() => setOpen(false)} >         
                        <ul  className="text-base fixed flex flex-col items-start p-6 l-0 h-screen w-80 text-white bg-gray-950 opacity-95">
                            <div className="py-1 pr-2 mb-2 hover:p-1 hover:bg-yellow-600 hover:rounded-md active:bg-yellow-500 border-b-amber-400 border-b-2 w-full gap-2 flex items-center" onClick={() => onMenuClick()}>
                                <ion-icon name="copy-outline"></ion-icon>
                                <span>Home</span>
                            </div>
                            {user.lists.map((item) => 
                            <div className="hover:bg-yellow-600 rounded-md active:bg-yellow-500 hover:pr-2 p-1 mr-4 w-full" onClick={() => onMenuClick(item)} key={item.id}>
                                <li className="my-1 flex items-center gap-2 text-ellipsis" >
                                    <ion-icon className="pr-2" name="clipboard-outline"></ion-icon>
                                    <span className="text-ellipsis overflow-hidden w-64 border-b-stone-500 border-b-2 border-opacity-20">{item.title}</span>
                                </li>
                            </div>)}
                        </ul>
                    </div>
                )}
            
        </div>
    )
}

export default BurgerMenu