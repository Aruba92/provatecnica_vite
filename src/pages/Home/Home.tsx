import './home.css'
import { useState, useEffect } from 'react';
import Pagination from "../../components/Pagination/Pagination";
import PokemonElement from "../../components/PokemonElement/PokemonElement";
import Pokemon from "../../types/Pokemon";
import {APIPokemonService} from "../../services/API";
import { useNavigate, useLocation  } from 'react-router-dom';

export default function Home() {

    const [data, setData] = useState<Pokemon[]>([]);
    const navigate  = useNavigate()
    const location = useLocation();
    const ApiService = new APIPokemonService();

    /*Query Params*/
    let queryParams = new URLSearchParams(location.search);
    let viewParam = queryParams.get('view');
    let pageParam = queryParams.get('page');

    /*ViewType*/
    let viewType:string = viewParam == null ? "list" : viewParam;
        
    /*Pagination*/
    let currentPage:number = pageParam == null ? 1 : parseInt(pageParam);
    const elementsPerPage:number = 40;

    let url:string = "/pokemons?view="+viewType+"&page="+currentPage;

    useEffect(() => {
        ApiService.APIcallLimit(setData, "?limit=160");
        setQueryParams(viewType, currentPage);
    }, [])

    function setPagination (pageNumber:number) {
        setQueryParams(viewType, pageNumber)
    }

    function setQueryParams (viewType:string, pageNumber:number) {
        url = "/pokemons?view="+viewType+"&page="+pageNumber;
        navigate(url);
    }

    return (
    <main className="main">
        <h1>Llista de Pokemons</h1>
        <div className="viewButtons">
            <button className={viewType==="list" ? "active":""} onClick={()=>setQueryParams("list", currentPage)}>List</button>
            <button className={viewType==="grid" ? "active":""} onClick={()=>setQueryParams("grid", currentPage)}>Grid</button>
        </div>

        <div className={viewType==="list" ? "pokemonsBoxList" : "pokemonsBoxGrid"}>
            <PokemonElement pokemonList={data.slice((currentPage-1)*elementsPerPage, currentPage*elementsPerPage)} url={url}></PokemonElement>
        </div>
        <Pagination elementsPerPage={elementsPerPage} dataLength={Object.keys(data).length} handlePagination={setPagination} currentPage={currentPage}></Pagination>
    </main>
    );
}
