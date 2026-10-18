import { useState } from 'react'
import './Dados.css'

function Dados() {
    const [resultado, setResultado] = useState(null)
    const [historico, setHistorico] = useState([])

    const rolarDado = () => {
        const numero = Math.floor(Math.random() * 20) + 1
        setResultado(numero)
        setHistorico([numero].concat(historico).slice(0, 10))
    }

    return (
        <section className="dados-container">
            <h1 className="dados-title">Rolador de dados</h1>

            <div className="dados-card">
                <p className="dados-legenda">Dado de 20 lados (d20)</p>
                <div className="dados-resultado">
                    {resultado === null ? '?' : resultado}
                </div>
                {resultado === 20 && <p className="dados-critico">Acerto crítico!</p>}
                {resultado === 1 && <p className="dados-falha">Falha crítica!</p>}
                <button className="dados-botao" onClick={rolarDado}>Rolar d20</button>
            </div>

            <div className="dados-card">
                <h2 className="dados-subtitulo">Últimos rolamentos</h2>
                {historico.length === 0 ? (
                    <p className="dados-vazio">Ainda não há rolamentos.</p>
                ) : (
                    <ul className="dados-historico">
                        {historico.map((numero, indice) => (
                            <li key={indice}>{numero}</li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default Dados
