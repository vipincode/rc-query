import { usePokemon } from '../hooks';

const Pokemon = () => {
  const { isLoading, isError, data, error } = usePokemon();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return <h3>You are looking at {data.length} pokemon</h3>;
};

export default Pokemon;
