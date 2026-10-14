import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Router from "./Router"
import "./global.css"
function App() {

  return (
    <div className="app">
      <Header/>
      <Router/>
      <Footer/>
    </div>
  )
}

export default App
