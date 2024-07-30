import React, { createContext, useState, useEffect } from 'react';
import { authFetch } from "./App";
//import { useNavigate } from 'react-router-dom';


const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  //const navigate = useNavigate();
  const[user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null
  });

  const lists = user?.lists

  const filteredList =  query === '' ? lists : lists?.filter((list => {
    return  list?.items.find(item=> item?.text?.toLowerCase().includes(query.toLowerCase()))
  }))

  async function refreshLists (){
    const data = await authFetch('user/myself').then((data)=>{
      if(data){
        setUser(data);
      }
    })
  }


  // try to autoLogin 
  useEffect(()=>{
    //fetch user if page is reloaded
    if(!user) {
      sessionStorage.removeItem("user");
      //navigate('/auth');
      
    }else {
      sessionStorage.setItem("user", JSON.stringify(user));
    }

  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser,query, setQuery, filteredList,lists,refreshLists }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;