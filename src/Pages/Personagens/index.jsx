import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Personagens.css'

export default function Personagens() {
    const [nome, setNome] = useState('')
    const [classe, setClasse] = useState('Guerreiro')
    const [raca, setRaca] = useState('Humano')
    const [nivel, setNivel] = useState('1')
    const [personagens, setPersonagens] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/personagens')
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

        fetch('http://localhost:3000/personagens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, classe, raca, nivel }),
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
                toast.success('Personagem criado com sucesso.')
            })
            .catch(() => {
                toast.error('Não foi possível criar o personagem. Verifique se o JSON Server está ativo.')
            })
    }

    const deletePersonagem = (id) => {
        fetch(`http://localhost:3000/personagens/${id}`, {
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
                    <button className="form-button" type="submit">Criar personagem</button>
                </form>
            </section>

            <section className="lista-personagens">
                <h1>Lista de Personagens</h1>

                {personagens.map((personagem) => (
                    <article className="content-personagens" key={personagem.id}>
                        <strong>Nome: {personagem.nome}</strong>
                        <br/>
                        <strong>Classe: {personagem.classe}</strong>
                        <br/>
                        <strong>Raça: {personagem.raca}</strong>
                        <br/>
                        <strong>Nível: {personagem.nivel}</strong>
                        <br/>
                        <button
                            onClick={() => deletePersonagem(personagem.id)}
                            className="delete">Deletar
                        </button>
                    </article>
                ))}
            </section>
            <ToastContainer />
        </main>
    )
}
