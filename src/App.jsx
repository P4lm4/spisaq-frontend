import Home from "./Home"
import BurgerMenu from "./components/BurgerMenu"
import Nav from "./components/Nav"
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
    <div className="App h-screen bg-yellow-200">
      <Nav />
      <BurgerMenu />
      <div className="Content">
        <Routes>
          <Route path="/" element={<Home />} />          
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
