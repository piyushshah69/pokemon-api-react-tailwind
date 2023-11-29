import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const PokemonCard = ({ pokemonName, pokemonImage, id }) => {
  return (
    <Link to={`/pokemon/${id}`}>
      <div className="bg-white flex flex-col justify-center items-center gap-4 rounded-lg hover:bg-slate-200 transition cursor-pointer h-52">
        <p className="text-2xl text-center capitalize">{pokemonName}</p>
        <img className="h-3/5" src={pokemonImage} />
      </div>
    </Link>
  )
}

export default PokemonCard