import React, { createContext, useState, useEffect } from 'react';
import { authFetch } from "./App";


const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const[user, setUser] = useState();
  const [ lists, setLists] = useState((user != undefined && user.lists != undefined) ? user.lists : []);

  async function fetchUser() {
    console.log("I am trying to auto login")
    const data = await authFetch('user/myself');
    if(data){
      setUser(data);
      setLists(data.lists);
    }
}

  // try to autoLogin 
  useEffect(()=>{
    if(user === undefined){
      fetchUser()
    }

  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser , lists, setLists }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;