import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from "./Components/Nav"
import Home from './Pages/Home'
import Sobre from './Pages/Sobre'
import Jogos from './Pages/Jogos'
import Personagens from './Pages/Personagens'
import FAQ from './Pages/FAQ'
import CadastroNews from './Pages/CadastroNews'
import Mesas from './Pages/Mesas'
import NotFound from './Pages/NotFound'

function Router(){
    return (
        <BrowserRouter>
        <Nav/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/jogos" element={<Jogos />} />
                <Route path="/personagens" element={<Personagens />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/cadastroNews" element={<CadastroNews />} />
                <Route path="/mesas" element={<Mesas />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>

    )
}

export default Router
