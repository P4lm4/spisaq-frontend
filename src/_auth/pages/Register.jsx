import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Config';

async function registerUser(username, password, email) {
  const requestData = {
    "username": username,
    "password": password,
    "email": email
  }
  return fetch(API_URL + 'register', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(requestData)
  })
    .then(data => data.json())
    .catch(err => console.log(err))
}

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitRegister = async e => {
    e.preventDefault();
    console.log({confirmPassword})
    console.log({password})
    if(confirmPassword === password) {
      registerUser(username, password, email).then(response=>{
        if(response.status === 'OK'){
          navigate('/auth');
          alert(response.message)
        }else{
          alert(response.message)
        }
      })
    } else {
      alert("Password don't match! ")
    }
  }


  return (
    <div className='flex items-center justify-center h-screen'>
    <div className='flex flex-col items-center justify-center w-72 bg-black rounded-xl p-5 text-white gap-4'>
      <h1 className='text-2xl font-bold border-b-yellow-400 border-b-2 w-full text-center pb-1'>Register</h1>
      <form onSubmit={handleSubmitRegister}  className='flex flex-col items-center justify-center' >
        <label>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} className='m-1 text-black p-1 opacity-90 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400' placeholder='Email' type="email"></input>
        </label>
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
        <label>
          <p>Confirm password</p>
          <input onChange={(e) => setConfirmPassword(e.target.value)} className='m-1 text-black p-1 opacity-90 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400' placeholder='Confirm password' type="password"></input>
        </label>
        
        <button type="submit" className='bg-yellow-400 rounded-xl mt-3 px-8  font-bold text-xl'>Sign up</button>
        
      </form>
      <button className='bg-yellow-400 rounded-xl px-4 border-black font-bold text-xl' onClick={() => navigate('/auth')}>Back</button>
    </div>
  </div>
  )
}

export default Register