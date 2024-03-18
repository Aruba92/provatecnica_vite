import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PokemonDetail from './pages/PokemonDetail/PokemonDetail.tsx';
import Home from './pages/Home/Home.tsx';
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pokemons"/>}></Route>
        <Route path="/pokemons" element={< Home />}></Route>
        <Route path="pokemons/:id" element={< PokemonDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
