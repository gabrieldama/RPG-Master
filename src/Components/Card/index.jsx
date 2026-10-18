import "./Card.css"

function Card(props) {
  return (
    <article className='card'>
        {props.campos.map((campo) => (
            <div key={campo.nome}>
                <strong>{campo.nome}: {campo.valor || '-'}</strong>
            </div>
        ))}
        <button
            onClick={props.onDelete}
            className="card-delete">Deletar
        </button>
    </article>
  )
}

export default Card
