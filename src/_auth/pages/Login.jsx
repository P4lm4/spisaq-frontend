import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


async function loginUser(username, password) {
  const requestData = {
    "username": username,
    "password": password
  };
  return fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestData)
  })
    .then(data => data.json())
    .catch(err => console.log(err))
}

async function getMyself(token) {

  return fetch('http://localhost:8080/api/user/myself', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    
  })
    .then(data => data.json())
    .catch(err => console.log(err))
}


function Login() {
const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [newToken, setNewToken] = useState();
const navigate = useNavigate();


const handleSubmit = async e => {
  e.preventDefault();
  const data = await loginUser(username, password);
  
  console.log(data);
  
  const user = await getMyself(data.token);
  console.log(user);

  navigate('/');
}



  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center bg-black rounded-xl p-5 text-white'>
        <h1>Sing in</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
          <label>
            <p>Username</p>
            <input onChange={(e) => setUsername(e.target.value)} className='rounded-xl m-1 text-black p-1' placeholder='Username' type="text"></input>
          </label>
          <label>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} className='rounded-xl m-1 text-black p-1' placeholder='Password' type="password"></input>
          </label>
          <div className='flex flex-col items-center justify-center'>
            <button type="submit" className='bg-yellow-400 rounded-xl m-1 px-10 border-black font-bold'>Login</button>
            <p>Don't have an a account? <span><Link to="register"><span className='text-blue-700 text-unde'>Sign up</span></Link></span></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login