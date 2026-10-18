import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Card from '../../Components/Card'
import './Mesas.css'

const endpoint = 'http://localhost:3000/mesas'

function Mesas() {
    const [nome, setNome] = useState('')
    const [jogo, setJogo] = useState('')
    const [dia, setDia] = useState('')
    const [mesas, setMesas] = useState([])

    useEffect(() => {
        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => setMesas(data))
            .catch((error) => console.log(error))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!nome.trim() || !jogo.trim() || !dia) {
            toast.error('Todos os campos são obrigatórios.')
            return
        }

        fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, jogo, dia }),
            })
            .then((response) => {
                if (!response.ok) throw new Error('Falha no cadastro')
                return response.json()
            })
            .then((mesa) => {
                setMesas(mesas.concat(mesa))
                setNome('')
                setJogo('')
                setDia('')
                toast.success('Mesa cadastrada com sucesso.')
            })
            .catch(() => toast.error('Não foi possível cadastrar a mesa. Verifique se o JSON Server está ativo.'))
    }

    const deleteMesa = (id) => {
        fetch(`${endpoint}/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setMesas(mesas.filter((mesa) => mesa.id !== id))
            toast.success('Mesa removida.')
        })
        .catch((error) => console.error(error))
    }

    return (
        <main>
            <section className="mesas-container">
                <h1 className="mesas-title">Cadastrar mesa</h1>
                <form className="mesas-form" onSubmit={handleSubmit}>
                    <div className="mesas-field">
                        <label htmlFor="mesa-nome">Nome da mesa</label>
                        <input id="mesa-nome" type="text" value={nome} onChange={(event) => setNome(event.target.value)} required />
                    </div>
                    <div className="mesas-field">
                        <label htmlFor="mesa-jogo">Jogo</label>
                        <input id="mesa-jogo" type="text" value={jogo} onChange={(event) => setJogo(event.target.value)} required />
                    </div>
                    <div className="mesas-field">
                        <label htmlFor="mesa-dia">Dia</label>
                        <input id="mesa-dia" type="date" value={dia} onChange={(event) => setDia(event.target.value)} required />
                    </div>
                    <button className="mesas-submit" type="submit">Cadastrar mesa</button>
                </form>
            </section>

            <section className="mesas-lista">
                <div className="mesas-lista-titulo">
                    <h1>Mesas marcadas</h1>
                    <span className="mesas-contador">{mesas.length}</span>
                </div>

                {mesas.length === 0 && (
                    <p className="mesas-vazia">Ainda não há mesas marcadas.</p>
                )}

                {mesas.map((mesa) => (
                    <Card
                        key={mesa.id}
                        campos={[
                            { nome: 'Mesa', valor: mesa.nome },
                            { nome: 'Jogo', valor: mesa.jogo },
                            { nome: 'Dia', valor: mesa.dia },
                        ]}
                        onDelete={() => deleteMesa(mesa.id)}
                    />
                ))}
            </section>
            <ToastContainer />
        </main>
    )
}

export default Mesas
