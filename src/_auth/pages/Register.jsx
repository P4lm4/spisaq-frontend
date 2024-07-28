import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

async function registerUser(username, password, email) {
  const requestData = {
    "username": username,
    "password": password,
    "email": email
  }
  return fetch('http://localhost:8080/api/register', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(requestData)
  })
    .then(data => data.json())
    .catch(err => console.log(err))
}

function Register() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  const handleSubmitRegister = async e => {
    if(confirmPassword === password) {
      e.preventDefault();
      const data = await registerUser(username, password, email);
    
      console.log(data);
      navigate('/auth');
    }
    else {
      alert("Passwords do not match ! ")
    }


  }


  return (
    <div className='flex items-center justify-center h-screen'>
    <div className='flex flex-col items-center justify-center bg-black rounded-xl p-5 text-white'>
      <h1>Register</h1>
      <form onSubmit={handleSubmitRegister}  className='flex flex-col items-center justify-center' >
        <input onChange={(e) => setEmail(e.target.value)} className='rounded-xl m-1 text-black p-1' placeholder='Email' type="email"></input>
        <input onChange={(e) => setUsername(e.target.value)} className='rounded-xl m-1 text-black p-1' placeholder='Username' type="text"></input>
        <input onChange={(e) => setPassword(e.target.value)} className='rounded-xl m-1 text-black p-1' placeholder='Password' type="password"></input>
        <input onChange={(e) => setConfirmPassword(e.target.value)} className='rounded-xl m-1 text-black p-1' placeholder='Confirm password' type="password"></input>
        <div>
          <button type="submit" className='bg-yellow-400 rounded-xl m-1 px-10 border-black font-bold'>Sign up</button>
      </div>
      </form>


    </div>
  </div>
  )
}

export default Register