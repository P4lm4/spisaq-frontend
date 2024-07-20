import { Router, Routes, Route } from "react-router-dom"

//pages
import Home from "./_root/pages/Home"
import Login from "./_auth/pages/Login"
import Register from "./_auth/pages/Register"
import Content from "./_root/pages/Content"

import RootLayout from "./_root/RootLayout"





function App() {

  return (
    
      <Router>
        

        <Routes path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="content" element={<Content />} />
        </Routes>
    </Router>
    

  )
}

export default App
