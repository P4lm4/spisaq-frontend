import React, { createContext, useState, useEffect } from 'react';
import { authFetch } from "./App";


const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const[user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null
  });
  // const [ lists, setLists] = useState((user != undefined && user.lists != undefined) ? user.lists : []);

  async function fetchUser() {
    console.log("I am trying to auto login")
    const data = await authFetch('user/myself');
    if(data){
      setUser(data);
      //setLists(data.lists);
    }
}
  /*
  useEffect(() => {
    if(user) {
      const userCopy = {...user};
      userCopy.lists = lists;
      setUser(userCopy);
    }
  }, [lists])
  */

  // try to autoLogin 
  useEffect(()=>{
    //fetch user if page is reloaded
    if(!user) {
      sessionStorage.removeItem("user");
    }else {
      sessionStorage.setItem("user", JSON.stringify(user));
    }

  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;