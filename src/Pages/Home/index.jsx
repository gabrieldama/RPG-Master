import Box from "../../Components/Box"
import imgJogos from "../../assets/img/jogos.svg"
import imgPersonagens from "../../assets/img/personagens.svg"
import imgSobre from "../../assets/img/sobre.svg"


function index() {
  return (
    <main className='container'>
        <section className='d-flex'>
            <Box 
              title='Jogos de RPG'
              description='Conheça alguns dos RPGs de mesa mais jogados do mundo na página Jogos.'
              imagem={imgJogos}
            />
            <Box  
              title='Seus Personagens'
              description='Crie seus personagens escolhendo nome, classe, raça e nível na página Personagens.'
              imagem={imgPersonagens}
              />
            <Box  
              title='Sobre o Projeto'
              description='Saiba mais sobre o RPG Master e o que foi praticado nele na página Sobre.'
              imagem={imgSobre}
              />
        </section>
    </main>
  )
}

export default index
