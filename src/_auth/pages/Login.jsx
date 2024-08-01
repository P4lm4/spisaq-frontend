import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../App";
import UserContext from "../../UserContext";
import { API_URL } from "../../Config";

async function loginUser(username, password) {
  const requestData = {
    username: username,
    password: password,
  };

  return fetch(API_URL + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  })
    .then((data) => data.json())
    .catch((err) => alert("Wrong username or password!"));
}

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(username, password);
    setToken(data.token);
    setUser(data.user);

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-72 bg-black rounded-xl p-5 text-white">
        <h1 className="text-2xl font-bold border-b-yellow-300 border-b-2 w-full text-center mb-3 pb-4">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-2 pt-2"
        >
          <div className="flex w-full flex-col gap-1">
            <label>
              <p className="text-xs text-yellow-300">Username</p>
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="text-black opacity-90 block w-full py-2 px-2 bg-white border border-slate-300 rounded-md text-xs shadow-sm placeholder-slate-400
            focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              placeholder="Enter your username"
              type="text"
            ></input>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label>
              <p className="text-xs text-yellow-300">Password</p>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="text-black opacity-90 block w-full py-2 px-2 bg-white border border-slate-300 rounded-md text-xs shadow-sm placeholder-slate-400
          focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              placeholder="Enter your password"
              type="password"
            ></input>
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="bg-yellow-300 rounded-xl my-6 py-2 w-full border-black font-bold text-black text-md"
            >
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <span>
                <Link to="register">
                  <span className="text-blue-700 underline">Register</span>
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
/*
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
*/
export default Login;
