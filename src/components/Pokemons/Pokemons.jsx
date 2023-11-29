import { useEffect, useState } from "react"
import axios from "axios"
import PokemonCard from "../PokemonCard/PokemonCard";

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokeApiUrl, setPokeApiUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');

    const fetchPokemonData = async () => {
        try {
            const response = await axios.get(pokeApiUrl);
            setNextUrl(response.data.next);
            setPreviousUrl(response.data.previous);
            const fetchedResults = response.data.results;
            const resultPromises = fetchedResults.map((pokemon) => axios.get(pokemon.url))
            const pokemonData = await axios.all(resultPromises);
            setPokemons(pokemonData.map(pokemonResult => {
                const pokemon = pokemonResult.data
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    imageUrl: pokemon.sprites.other ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_default,
                }
            }))
            setIsLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetchPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokeApiUrl])

    const PaginationBtns = () => {
        return <div className="flex justify-center my-8 gap-4">
            <button disabled={previousUrl == null} onClick={() => setPokeApiUrl(previousUrl)} className="text-white bg-slate-700 py-1 px-3 rounded disabled:text-slate-500">← Previous</button>
            <button disabled={nextUrl == null} onClick={() => setPokeApiUrl(nextUrl)} className="text-white bg-slate-700 py-1 px-3 rounded">Next →</button>
        </div>
    }

  return (
      <div>
          <PaginationBtns />

          {(isLoading) ? <p className="text-center text-white text-lg">Loading, Please wait...</p> :
              <div className="px-5 lg:px-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-8 place-content-center">
                  {
                      pokemons.map(e => <PokemonCard key={e.id} pokemonName={e.name} pokemonImage={e.imageUrl} id={e.id} />)
                  }
              </div>
          }

          <PaginationBtns />
      </div>
  )
}

export default Pokemons