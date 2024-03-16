import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetail from './pages/PokemonDetail/PokemonDetail.tsx';
import Home from './pages/Home/Home.tsx';
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Home />}></Route>
        <Route path="pokemon/:pokemonName" element={< PokemonDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
