import Box from "../../Components/Box"
import logo from "../../assets/img/RPG.svg"


function index() {
  return (
    <main className='container'>
        <section className='d-flex'>
            <Box 
              title='Jogos de RPG'
              description='Conheça alguns dos RPGs de mesa mais jogados do mundo na página Jogos.'
              imagem={logo}
            />
            <Box  
              title='Seus Personagens'
              description='Crie seus personagens escolhendo nome, classe, raça e nível na página Personagens.'
              imagem={logo}
              />
            <Box  
              title='Sobre o Projeto'
              description='Saiba mais sobre o RPG Master e o que foi praticado nele na página Sobre.'
              imagem={logo}
              />
        </section>
    </main>
  )
}

export default index
