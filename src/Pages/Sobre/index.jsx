import { useEffect, useState } from "react"
import "./Sobre.css"

function Sobre() {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/sobre")
      .then((response) => response.json())
      .then((data) => setAbout(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="about-container">
      <h1 className="about-title">Sobre</h1>

      {about.map((item) => (
        <div className="about-item" key={item.id}>
          <h2 className="about-title">{item.titulo}</h2>
          <p className="about-description">
            {item.conteudo}
          </p>
        </div>
      ))}

            
    </section>
  )
}

export default Sobre