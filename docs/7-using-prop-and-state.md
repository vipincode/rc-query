# Intro

just Like react default we can pass props at top most components and spread across child

## Hooks

```tsx
export const useSearchPokemon = (searchPokemon: string) => {
  return useQuery({
    queryKey: ['pokemon', searchPokemon],
    queryFn: async () => {
      await delay(1000);
      return axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`).then((res) => res.data);
    },
    enabled: !!searchPokemon,
  });
};
```

## Step 1

- First create an `SearchInput` components and Add here `<PokemonSearch />` component inside it
- then pass pokemon as props

```tsx
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
```

## Step 2

- lets receive `pokemon` props like this `{ pokemon }: { pokemon: string }`

```tsx
import { useSearchPokemon } from '../hooks';

const PokemonSearch = ({ pokemon }: { pokemon: string }) => {
  const { data, isError, isLoading, error, isFetching } = useSearchPokemon(pokemon);

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Oops something went wrong {error?.message}</div>;

  return (
    <div>
      Show the pokemon sprite
      {data?.sprites?.front_default ? (
        <img
          src={data.sprites.front_default}
          alt='pokemon'
        />
      ) : (
        <h3>Pokemon not found!</h3>
      )}
      {isFetching ? <p>Updating...</p> : null}
    </div>
  );
};

export default PokemonSearch;
```

## Step 3

- Lets add the search input into main components

```tsx
import PokemonSearchInput from './components/PokemonSearchInput';

function App() {
  return (
    <>
      <PokemonSearchInput />
    </>
  );
}

export default App;
```

## Hooks, An Problem occur for data loading lets understand

- When we are creating this hooks an problem occur bcs our state is initially empty `const [pokemon, setPokemon] = useState('')`, so when our app is loaded, `searchPokemon` initially is going to empty, so what happen it load all results data, you can check this inside, network tab.
- For preventing this we are `enabled` configuration, this is an boolean value, when its only true then we are loading the data.
- `enabled: !!searchPokemon` what this means run this query only when `searchPokemon` have data, or its value is true.

```tsx
export const useSearchPokemon = (searchPokemon: string) => {
  return useQuery({
    queryKey: ['pokemon', searchPokemon],
    queryFn: async () => {
      await delay(1000);
      return axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`).then((res) => res.data);
    },
    // The query will not execute until the `searchPokemon` exists
    enabled: !!searchPokemon,
  });
};
```
