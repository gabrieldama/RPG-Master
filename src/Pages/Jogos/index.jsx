import { useEffect, useState } from "react"
import "./Jogos.css"

function Jogos() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/jogos")
      .then((response) => response.json())
      .then((data) => setJogos(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="jogos-container">
      <h1 className="jogos-title">Jogos de RPG</h1>

      {jogos.map((item) => (
        <div className="jogos-item" key={item.id}>
          <h2 className="jogos-nome">{item.nome}</h2>
          <p className="jogos-descricao">
            {item.descricao}
          </p>
        </div>
      ))}

    </section>
  )
}

export default Jogos
