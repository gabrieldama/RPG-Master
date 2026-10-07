import Header from "./Components/Header"
import "./global.css"
import Router from "./Router"
import Home from "./Pages/Home"
function App() {

  return (
    <div className="app">
      <Router/>
      <Header/>
      <Home/>
    </div>
  )
}

export default App
