import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserProvider } from "./UserContext"

//pages
import Home from "./_root/pages/Home"
import Login from "./_auth/pages/Login"
import Register from "./_auth/pages/Register"
import Content from "./_root/pages/Content"

//...
import RootLayout from "./_root/RootLayout"
import AuthLayout from "./_auth/AuthLayout"


export function setToken(userToken) {
  sessionStorage.setItem('token', userToken);
}

export function getToken() {
  return sessionStorage.getItem('token');
}
/*
export function setLists(userLists) {
  sessionStorage.setItem('lists', JSON.stringify(userLists))
}

export function getLists() {
  return JSON.parse(sessionStorage.getItem('lists'));
}
*/
export async function authFetch(Url, data = null, method = 'GET') {

  return fetch('http://localhost:8080/api/' + Url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },

    body: (data != null) ? JSON.stringify(data) : null
  })
    .then(data => data.json())
    .catch(err => console.log(err))
}




function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="content/:id" element={<Content />} />
            <Route path="content/new" element={<Content />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>


  )
}

export default App
