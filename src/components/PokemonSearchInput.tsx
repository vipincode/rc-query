import { useState } from 'react';
import PokemonSearch from './PokemonSearch';

const PokemonSearchInput = () => {
  const [pokemon, setPokemon] = useState('');
  return (
    <>
      <input
        type='text'
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
      />
      <PokemonSearch pokemon={pokemon} />
    </>
  );
};

export default PokemonSearchInput;
