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
