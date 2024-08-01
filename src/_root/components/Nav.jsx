import React, { useContext, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import { setToken } from "../../App";

function Nav() {
  const { user, setUser, query, setQuery } = useContext(UserContext);

  function signOut() {
    console.log("Sign Out");
    setToken(null);
    setUser(null);
    // navigate('/auth');
  }

  return (
    <div className="fixed z-50 inset-x-0 top-0 w-full bg-black flex items-center justify-between">
      <div className="flex flex-row items-center basis-1/4 font-bold text-2xl cursor-pointer text-slate-200">
        <BurgerMenu />
        <Link className="flex justify-center items-center" to="/">
          <span className="mr-1 text-3xl text-amber-400">
            <ion-icon name="clipboard-outline"></ion-icon>
          </span>
          <span className="text-lg md:text-3xl">
            Spisa<span className="text-yellow-400">q</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center justify-center basis-2/4">
        <input
          className="m-1 text-black p-1 opacity-90 mt-1 block w-full px-2 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          placeholder="Search items in this list"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {user && (
        <div className="flex flex-row items-center justify-end basis-1/4 font-bold text-white">
          <div className="text-sm flex-col items-center justify-center mr-2 text:sm md:text-base">
            <p>{user.username}</p>
            <p>
              <Link
                onClick={signOut}
                to="/auth"
                className="hover:text-gray-300 duration-500"
              >
                Sign out
              </Link>
            </p>
          </div>
          <div className="text-4xl text-amber-400 mx-1 pt-2 hidden md:block">
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
