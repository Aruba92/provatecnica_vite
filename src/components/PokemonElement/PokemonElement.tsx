import Pokemon from "../../types/Pokemon";
import styles from "./pokemonElement.module.css";
import { useNavigate } from 'react-router-dom';

interface Props{
    pokemonList:Pokemon[],
    url:string
}

export default function PokemonElement ( {pokemonList, url}:Props ) :JSX.Element {
    
    const navigate  = useNavigate()

    return(
        <>
            {pokemonList.map((element:any, index:number) => (
                <a href={""} onClick={()=>{navigate(element.name, {state:{url:url}})}} key={index}>
                    <p className={styles.pokemonElement}>{element.name}</p>
                </a>
            ))}
        </>
    );
}