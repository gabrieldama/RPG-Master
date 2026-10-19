import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Card from '../../Components/Card'
import './Personagens.css'
import API from '../../api'

export default function Personagens() {
    const [nome, setNome] = useState('')
    const [classe, setClasse] = useState('Guerreiro')
    const [raca, setRaca] = useState('Humano')
    const [nivel, setNivel] = useState('1')
    const [vida, setVida] = useState('10')
    const [forca, setForca] = useState('10')
    const [destreza, setDestreza] = useState('10')
    const [personagens, setPersonagens] = useState([])

    useEffect(() => {
        fetch(`${API}/personagens`)
            .then((response) => response.json())
            .then((data) => setPersonagens(data))
            .catch((error) => console.log(error))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!nome.trim() || !nivel.trim()) {
            toast.error('Todos os campos são obrigatórios.')
            return
        }

        fetch(`${API}/personagens`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, classe, raca, nivel, vida, forca, destreza }),
            })
            .then((response) => {
                if (!response.ok) throw new Error('Falha no cadastro')
                return response.json()
            })
            .then((personagem) => {
                setPersonagens(personagens.concat(personagem))
                setNome('')
                setClasse('Guerreiro')
                setRaca('Humano')
                setNivel('1')
                setVida('10')
                setForca('10')
                setDestreza('10')
                toast.success('Personagem criado com sucesso.')
            })
            .catch(() => {
                toast.error('Não foi possível criar o personagem. Verifique se o JSON Server está ativo.')
            })
    }

    const deletePersonagem = (id) => {
        fetch(`${API}/personagens/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setPersonagens(personagens.filter((personagem) => personagem.id !== id))
            toast.success('Personagem removido.')
        })
        .catch((error) => console.error(error))
    }

    return (
        <main>
            <section className="cadastro-container">
                <h1 className="cadastro-title">Criar personagem</h1>
                <form className="form-card" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="nome">Nome</label>
                        <input id="nome" type="text" value={nome} onChange={(event) => setNome(event.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="classe">Classe</label>
                        <select id="classe" value={classe} onChange={(event) => setClasse(event.target.value)}>
                            <option value="Guerreiro">Guerreiro</option>
                            <option value="Mago">Mago</option>
                            <option value="Arqueiro">Arqueiro</option>
                            <option value="Ladino">Ladino</option>
                            <option value="Clérigo">Clérigo</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="raca">Raça</label>
                        <select id="raca" value={raca} onChange={(event) => setRaca(event.target.value)}>
                            <option value="Humano">Humano</option>
                            <option value="Elfo">Elfo</option>
                            <option value="Anão">Anão</option>
                            <option value="Orc">Orc</option>
                            <option value="Halfling">Halfling</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="nivel">Nível</label>
                        <input id="nivel" type="number" min="1" max="20" value={nivel} onChange={(event) => setNivel(event.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="vida">Vida</label>
                        <input id="vida" type="number" min="1" value={vida} onChange={(event) => setVida(event.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="forca">Força</label>
                        <input id="forca" type="number" min="1" max="30" value={forca} onChange={(event) => setForca(event.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="destreza">Destreza</label>
                        <input id="destreza" type="number" min="1" max="30" value={destreza} onChange={(event) => setDestreza(event.target.value)} required />
                    </div>
                    <button className="form-button" type="submit">Criar personagem</button>
                </form>
            </section>

            <section className="lista-personagens">
                <div className="lista-titulo">
                    <h1>Lista de Personagens</h1>
                    <span className="contador">{personagens.length}</span>
                </div>

                {personagens.length === 0 && (
                    <p className="mensagem-vazia">Ainda não há personagens.</p>
                )}

                {personagens.map((personagem) => (
                    <Card
                        key={personagem.id}
                        campos={[
                            { nome: 'Nome', valor: personagem.nome },
                            { nome: 'Classe', valor: personagem.classe },
                            { nome: 'Raça', valor: personagem.raca },
                            { nome: 'Nível', valor: personagem.nivel },
                            { nome: 'Vida', valor: personagem.vida },
                            { nome: 'Força', valor: personagem.forca },
                            { nome: 'Destreza', valor: personagem.destreza },
                        ]}
                        onDelete={() => deletePersonagem(personagem.id)}
                    />
                ))}
            </section>
            <ToastContainer />
        </main>
    )
}
