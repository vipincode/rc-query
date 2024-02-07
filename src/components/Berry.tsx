import { useBerry } from '../hooks';

const Berry = () => {
  const { isLoading, isError, data, error, isFetching } = useBerry();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main>
      <h1>Berry Lists:</h1>
      <div>
        {data.map((item) => (
          <div key={item.name}>{item.name}</div>
        ))}
      </div>
      <div>{isFetching ? 'Updating...' : null}</div>
    </main>
  );
};

export default Berry;
