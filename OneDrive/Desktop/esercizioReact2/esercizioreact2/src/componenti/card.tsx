type PokemonNameProp = {
    pokemonName: string 
}

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};





function Card({pokemonName}:PokemonNameProp) {
    const bgColor = typeColors[pokemonName.types[0].type.name]
    return(<>
    <div
    style={{
        backgroundColor: bgColor,
        margin: "5px",
        padding: "5px",
        borderRadius: "5px",
        width: "300px"
    }}
    >
            <h2>{pokemonName.name.toUpperCase()}</h2>
            <img 
            src={pokemonName.sprites.front_default}
            alt={pokemonName.name}
            ></img>
            <p>Tipo: {pokemonName.types[0].type.name}  {pokemonName.types[1]?.type.name}</p>
            <p>Abilità: {pokemonName.abilities[0].ability.name}  {pokemonName.abilities[1]?.ability.name}</p>
            <p>Altezza: {pokemonName.height / 10}</p>
            <p>Peso: {pokemonName.weight / 10}</p>
        </div>
    </>)
}

export default Card