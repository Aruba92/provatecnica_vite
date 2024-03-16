import Pokemon from "../../types/Pokemon";
import styles from "./pokemonElement.module.css";

interface Props{
    pokemonList:Pokemon[]
}

export default function PokemonElement ( {pokemonList}:Props ) :JSX.Element {
    return(
        <>
            {pokemonList.map((element:any, index:number) => (
                <a href={"pokemon/"+element.name} key={index}>
                    <p className={styles.pokemonElement}>{element.name}</p>
                </a>
            ))}
        </>
    );
}