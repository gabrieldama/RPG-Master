import { useEffect, useState } from "react"
import "./FAQ.css"

function FAQ() {
  const [faqItems, setFaqItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/faq")
      .then((response) => response.json())
      .then((data) => setFaqItems(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="faq-container">
      <h1 className="faq-title">Perguntas Frequentes</h1>

      {faqItems.map((item) => (
        <div className="faq-item" key={item.id}>
          <h2 className="faq-question">{item.pergunta}</h2>
          <p className="faq-answer">
            {item.resposta}
          </p>
        </div>
      ))}

    </section>
  )
}

export default FAQ
