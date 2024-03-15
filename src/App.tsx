import './App.css'
import { useState, useEffect } from 'react';

import Pagination from "./components/Pagination/Pagination";
import PokemonElement from "./components/PokemonElement/PokemonElement";
import Pokemon from "./types/Pokemon";
import {APIPokemonService} from "./services/API";

export default function App() {
/*Fetch Data*/
const [data, setData] = useState<Pokemon[]>([]);
/*ViewType*/
let viewTypeValue = "list";
if (window.localStorage.getItem("viewType")){
  viewTypeValue = window.localStorage.getItem("viewType")!;
}
const [viewType, setViewType] = useState<string>(viewTypeValue);
/*Pagination*/
let currentPageValue = 1;
if (window.localStorage.getItem("currentPage")){
  currentPageValue = parseInt(window.localStorage.getItem("currentPage")!);
}
const [currentPage, setCurrentPage] = useState<number>(currentPageValue);
/* const [elementsPerPage, setElementsPerPage] = useState<number>(10); */
const elementsPerPage:number = 40;

const ApiService = new APIPokemonService();
useEffect(() => {
  ApiService.APIcallLimit(setData, "?limit=160");
}, [])

useEffect(()=>{
  window.localStorage.setItem("currentPage", currentPage.toString());
},[currentPage])
useEffect(()=>{
  window.localStorage.setItem("viewType", viewType);
},[viewType])

function handlePagination (pageNumber:number) {
  setCurrentPage(pageNumber);
}

function setView(type:string){
  if (type==="list") {
    setViewType("list");
    setCurrentPage(1);
  }else{
    setViewType("grid");
    setCurrentPage(1);
  }
}

return (
  <main className="main">
    <h1>Llista de Pokemons</h1>
    <div className="viewButtons">
      <button className={viewType==="list" ? "active":""} onClick={()=>setView("list")}>List</button>
      <button className={viewType==="grid" ? "active":""} onClick={()=>setView("grid")}>Grid</button>
    </div>

    <div className={viewType==="list" ? "pokemonsBoxList" : "pokemonsBoxGrid"}>
      <PokemonElement pokemonList={data.slice((currentPage-1)*elementsPerPage, currentPage*elementsPerPage)}></PokemonElement>
    </div>

    <Pagination elementsPerPage={elementsPerPage} dataLength={Object.keys(data).length} handlePagination={handlePagination} currentPage={currentPage}></Pagination>
  </main>
);
}
