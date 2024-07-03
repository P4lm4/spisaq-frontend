import Home from "./Home"
import BurgerMenu from "./components/BurgerMenu"
import Nav from "./components/Nav"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


function App() {

  return (
    <Router>
    <div className="App">
      <Nav />
      <BurgerMenu />
      <div className="Content">
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  )
}

export default App
