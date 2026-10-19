import { useState } from 'react'
import imgDado from '../../assets/img/jogos.png'
import './Dados.css'

const tiposDeDado = [4, 6, 8, 10, 12, 20]

function Dados() {
    const [lados, setLados] = useState(20)
    const [resultado, setResultado] = useState(null)
    const [historico, setHistorico] = useState([])

    const escolherDado = (tipo) => {
        setLados(tipo)
        setResultado(null)
    }

    const rolarDado = () => {
        const numero = Math.floor(Math.random() * lados) + 1
        setResultado(numero)
        setHistorico([{ lados, numero }].concat(historico).slice(0, 10))
    }

    return (
        <section className="dados-container">
            <h1 className="dados-title">Rolador de dados</h1>

            <div className="dados-card">
                <p className="dados-legenda">Escolha o dado</p>
                <div className="dados-tipos">
                    {tiposDeDado.map((tipo) => (
                        <button
                            key={tipo}
                            className={tipo === lados ? 'dados-tipo dados-tipo-ativo' : 'dados-tipo'}
                            onClick={() => escolherDado(tipo)}>
                            d{tipo}
                        </button>
                    ))}
                </div>

                <div className="dados-resultado">
                    <img className="dados-imagem" src={imgDado} alt={`Dado de ${lados} lados`} />
                    <span className="dados-numero">{resultado === null ? '?' : resultado}</span>
                </div>

                {lados === 20 && resultado === 20 && <p className="dados-critico">Acerto crítico!</p>}
                {lados === 20 && resultado === 1 && <p className="dados-falha">Falha crítica!</p>}
                <button className="dados-botao" onClick={rolarDado}>Rolar d{lados}</button>
            </div>

            <div className="dados-card">
                <h2 className="dados-subtitulo">Últimos rolamentos</h2>
                {historico.length === 0 ? (
                    <p className="dados-vazio">Ainda não há rolamentos.</p>
                ) : (
                    <ul className="dados-historico">
                        {historico.map((rolagem, indice) => (
                            <li key={indice}>d{rolagem.lados}: {rolagem.numero}</li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default Dados
