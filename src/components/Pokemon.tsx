import { useReducer } from 'react';
import { usePokemon } from '../hooks';

const Pokemon = () => {
  const [show, toggle] = useReducer((d) => !d, true);
  const { isLoading, isError, data, error, isFetching } = usePokemon();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main>
      <h1>Pokemon Lists:</h1>
      <button onClick={() => toggle()}>Toggle Data</button>
      {show && (
        <div>
          {data.map((item) => (
            <div key={item.name}>{item.name}</div>
          ))}
        </div>
      )}
      <div>{isFetching ? 'Updating...' : null}</div>
    </main>
  );
};

export default Pokemon;

// 13
