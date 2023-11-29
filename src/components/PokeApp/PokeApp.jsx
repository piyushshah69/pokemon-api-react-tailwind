import Pokemons from '../Pokemons/pokemons'

const PokeApp = () => {
  return (
      <>
          <div className='max-w-lg my-8 mx-auto flex flex-col items-center'>
              <h1 className='text-white text-3xl tracking-widest uppercase mb-4'>Pokemon App</h1>
          </div>
          <Pokemons />
      </>
  )
}

export default PokeApp;