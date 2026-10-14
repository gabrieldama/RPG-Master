import "./Box.css"

function index(props) {
  return (
    <section className='container-box'>
            <img src={props.imagem} alt={props.title} className="image"></img>
            <h1 className='title-box'>{props.title}</h1>
            <p className='description'>
                {props.description}
            </p>
    </section>
)
}

export default index