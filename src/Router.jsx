import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from "./Components/Nav"
function Router(){
    return (
        <BrowserRouter>
        <Nav/>
            <Routes>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
            </Routes>
        </BrowserRouter>

    )
}

export default Router