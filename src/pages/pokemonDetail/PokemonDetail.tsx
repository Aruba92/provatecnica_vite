
import { useState, useEffect } from 'react';
import styles from "./pokemonDetail.module.css";
import Pokemon from "../../types/Pokemon";
import {APIPokemonService} from "../../services/API";
import { useParams, useNavigate, useLocation  } from 'react-router-dom'

export default function Page () :JSX.Element{
    const [data, setData] = useState<Pokemon>();
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const ApiService = new APIPokemonService();

    useEffect(() => {
        ApiService.APIcallPokemon(setData, "/" + id);
        }, [])

    function PokemonDetail () {
        if (typeof data === "object"){
            const pokemonUrlFragments:string[] = data.url.split("/");
            const pokemonId:string = data.url.split("/")[pokemonUrlFragments.length-2];
            const pokemonImgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ pokemonId +".png";
            return(
                <div className={styles.pokemonPage}>
                    <div className={styles.pokemonCard}>
                        <h2 className={styles.pokemonName}>{data.name}</h2>
                        <img src={pokemonImgUrl} alt={data.name}></img>
                    </div>
                    <button className={styles.homeButton} onClick={()=>navigate(location.state.url)}>Home</button>
                </div>
            )
        }
    }
    
    return(
        <PokemonDetail></PokemonDetail>
    );
}