import { useEffect, useState } from "react"
import "./Sobre.css"
import imgSobre from "../../assets/img/sobre.png"
import imgJogos from "../../assets/img/jogos.png"
import API from '../../api'

const imagens = {
  1: imgSobre,
  2: imgJogos,
}

function Sobre() {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    fetch(`${API}/sobre`)
      .then((response) => response.json())
      .then((data) => setAbout(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="about-container">
      <h1 className="about-title">Sobre</h1>

      {about.map((item) => (
        <div className="about-item" key={item.id}>
          {imagens[item.id] && (
            <img className="about-image" src={imagens[item.id]} alt={item.titulo} />
          )}
          <div className="about-text">
            <h2 className="about-title">{item.titulo}</h2>
            <p className="about-description">
              {item.conteudo}
            </p>
          </div>
        </div>
      ))}

            
    </section>
  )
}

export default Sobre