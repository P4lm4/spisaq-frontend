import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setToken } from '../../App';
import UserContext from '../../UserContext';
import { API_URL } from '../../Config';


async function loginUser(username, password) {
  const requestData = {
    "username": username,
    "password": password
  };


  return fetch(API_URL + 'login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestData)
  })
    .then(data => data.json())
    .catch(err => alert("Wrong username or password!"))
}

function Login() {
const [username, setUsername] = useState();
const [password, setPassword] = useState();
const navigate = useNavigate();
const { setUser } = useContext(UserContext);


const handleSubmit = async e => {
  
  e.preventDefault();
  const data = await loginUser(username, password);
  
  setToken(data.token);
  setUser(data.user);

  if(username !== data.username && password !== data.password) {
    alert("Login susscessful!");
  }

  navigate('/');
}





  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center w-72 bg-black rounded-xl p-5 text-white'>
        <h1 className='text-2xl font-bold border-b-yellow-400 border-b-2 w-full text-center mb-3 pb-1'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
          <label>
            <p>Username</p>
            <input onChange={(e) => setUsername(e.target.value)} className='m-1 text-black p-1 opacity-90 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400' placeholder='Username' type="text"></input>
          </label>
          <label>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} className='m-1 text-black p-1 opacity-90 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400' placeholder='Password' type="password"></input>
          </label>
          <div className='flex flex-col items-center justify-center'>
            <button type="submit" className='bg-yellow-400 rounded-xl m-2 px-10 border-black font-bold text-xl'>Login</button>
            <p>Don't have an account? <span><Link to="register"><span className='text-blue-700 underline'>Register</span></Link></span></p>
          </div>
        </form>
      </div>
    </div>
  )
}
/*
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
*/
export default Login