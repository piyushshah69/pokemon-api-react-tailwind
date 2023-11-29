import { Route, Routes } from "react-router-dom"

import PokeApp from "../components/PokeApp/PokeApp";
import SinglePagePokemon from "../components/SinglePokemonPage/SinglePagePokemon"

const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PokeApp/>} />
            <Route path="/pokemon/:id" element={<SinglePagePokemon />} />
        </Routes>
    )
}

export default CustomRoutes;