import { useEffect, useState } from "react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./Jogos.css"
import API from '../../api'

function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    fetch(`${API}/jogos`)
      .then((response) => response.json())
      .then((data) => setJogos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!nome.trim() || !descricao.trim()) {
      toast.error('Todos os campos são obrigatórios.')
      return
    }

    fetch(`${API}/jogos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao }),
      })
      .then((response) => {
        if (!response.ok) throw new Error('Falha no cadastro')
        return response.json()
      })
      .then((jogo) => {
        setJogos(jogos.concat(jogo))
        setNome('')
        setDescricao('')
        toast.success('Jogo cadastrado com sucesso.')
      })
      .catch(() => toast.error('Não foi possível cadastrar o jogo.'))
  }

  const deleteJogo = (id) => {
    fetch(`${API}/jogos/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setJogos(jogos.filter((jogo) => jogo.id !== id));
      toast.success('Jogo removido.')
    })
    .catch((error) => console.error(error))
  }

  return (
    <section className="jogos-container">
      <h1 className="jogos-title">Jogos de RPG</h1>

      <form className="jogos-form" onSubmit={handleSubmit}>
        <div className="jogos-field">
          <label htmlFor="jogo-nome">Nome do jogo</label>
          <input id="jogo-nome" type="text" value={nome} onChange={(event) => setNome(event.target.value)} required />
        </div>
        <div className="jogos-field">
          <label htmlFor="jogo-descricao">Descrição</label>
          <input id="jogo-descricao" type="text" value={descricao} onChange={(event) => setDescricao(event.target.value)} required />
        </div>
        <button className="jogos-submit" type="submit">Cadastrar jogo</button>
      </form>

      {jogos.map((item) => (
        <div className="jogos-item" key={item.id}>
          <h2 className="jogos-nome">{item.nome}</h2>
          <p className="jogos-descricao">
            {item.descricao}
          </p>
          <button className="jogos-delete" onClick={() => deleteJogo(item.id)}>Deletar</button>
        </div>
      ))}

      <ToastContainer />
    </section>
  )
}

export default Jogos
