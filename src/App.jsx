import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";

//pages
import Home from "./_root/pages/Home";
import Login from "./_auth/pages/Login";
import Register from "./_auth/pages/Register";
import Content from "./_root/pages/Content";

//...
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
import { API_URL } from "./Config";

export function setToken(userToken) {
  if (userToken) {
    sessionStorage.setItem("token", userToken);
  } else {
    sessionStorage.removeItem("token");
  }
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export async function authFetch(Url, method = "GET", data = null) {
  return fetch(API_URL + Url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },

    body: data != null ? JSON.stringify(data) : null,
  })
    .then((data) => {
      if (data.headers.get("content-type") === "application/json") {
        return data.json();
      } else {
        return data.text();
      }
    })
    .catch((err) => console.log(err));
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="content/:id" element={<Content />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
