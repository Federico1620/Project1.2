import { useState } from "react"
import Card from "./card"

function Form () {
    const [pokemonName, setPokemonName] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true);
        async function handleSubmit(e) {
            try {
                e.preventDefault()
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.nome.value}`)
        const result = await data.json()
        setPokemonName(result)
            } catch (error) {
                alert("Il Pokemon non esiste o hai digitato male il nome!")
            }
        }
       function handleInput(e) {
        setIsDisabled(!e.target.value.trim())
       }
 
    
    return(<>
    <form onSubmit={handleSubmit}>
        <label>Nome Pokemon</label>
        <input type="text" placeholder="digita nome Pokemon" name="nome" onInput={handleInput} // legge il valore senza controllare l'input
        ></input>
        <button type="submit" disabled={isDisabled}>Invia</button>
    </form>
    {pokemonName && (
        <Card pokemonName={pokemonName}></Card>
    )}
    </>)
}

export default Form