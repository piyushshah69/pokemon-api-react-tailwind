import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

const SinglePagePokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  const loadPokemon = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    console.log(response)
    setPokemon({
      name: response.data.name,
      weight: response.data.weight,
      height: response.data.height,
      imageUrl: response.data.sprites.other ? response.data.sprites.other.dream_world.front_default : response.data.sprites.front_default,
      types: response.data.types.map((types) => types.type.name),
    })
  }

  useEffect(() => {
    loadPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='my-10 flex flex-col gap-6 items-center'>
      <Link to={'/'} className="text-white bg-slate-700 py-1 px-3 rounded">⇦ Go Back</Link>

      <div className='bg-zinc-100 w-5/6 mx-auto max-w-2xl rounded-xl flex flex-col md:flex-row gap-10 md:gap-15 p-6 justify-center items-center' >
        <div className='w-full md:w-2/6'>
          <img className='w-4/5 md:w-full m-auto' src={pokemon.imageUrl} />
        </div>

        <div className='flex flex-col gap-4 md:gap-8 md:h-4/6'>
          <div className='flex items-center gap-10'>
            <h1 className='text-black capitalize text-3xl tracking-widest font-mono'>{pokemon.name}</h1>
            <p className='capitalize bg-slate-800 text-white py-0.5 px-2'>{pokemon.types}</p>
          </div>

          <div className='flex items-center gap-10'>
            <p className='capitalize text-lg'>Weight: <span className='px-2 py-1 bg-slate-800 text-white'>{pokemon.weight}</span></p>
            <p className='capitalize text-lg'>Height: <span className='px-2 py-1 bg-slate-800 text-white'>{pokemon.height}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePagePokemon