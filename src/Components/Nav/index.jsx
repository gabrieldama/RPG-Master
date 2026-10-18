import { Link } from 'react-router-dom'
import "./Nav.css"
import logo from "../../assets/img/RPG.svg"

function index() {
  return (
    <nav >
        <img className='logo' src={logo} alt="Logo do site" />
        <ul className='menu'>
            <li>
                <Link to="/">Início</Link>
            </li>
            <li>
                <Link to="/sobre">Sobre</Link>
            </li>
            <li>
                <Link to="/jogos">Jogos</Link>
            </li>
            <li>
                <Link to="/personagens">Personagens</Link>
            </li>
            <li>
                <Link to="/faq">FAQ</Link>
            </li>
        </ul>
    </nav>
  )
}

export default index