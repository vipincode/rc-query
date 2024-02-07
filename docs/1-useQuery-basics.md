# Intro

## useQuery

A query is a declarative dependency on an asynchronous source of data that is tied to a unique key. A query can be used with any Promise based method (including GET and POST methods) to fetch data from a server. If your method modifies data on the server, we recommend using Mutations instead.

### To subscribe to a query in your components or custom hooks, call the useQuery hook with at least:

- A unique key for the query

#### A function that returns a promise that:

- Resolves the data, or
- Throws an error

```tsx
import { useQuery } from '@tanstack/react-query';

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList });
}
```

- The unique key you provide is used internally for `refetching`, `caching`, and `sharing` your queries throughout your application.
- The query result returned by `useQuery` contains all of the information about the query that you'll need for templating and any other usage of the data:

```tsx
const result = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList });
```

#### The `result` object contains a few very important states you'll need to be aware of to be productive. A query can only be in one of the following states at any given moment:

- `isPending` or `status` === 'pending' - The query has no data yet
- `isError` or `status` === 'error' - The query encountered an error
- `isSuccess` or `status` === 'success' - The query was successful and data is available

#### Beyond those primary states, more information is available depending on the state of the query:

- `error` - If the query is in an `isError` state, the `error` is available via the error property.
- `data` - If the query is in an `isSuccess` state, the `data` is available via the data property.
- `isFetching` - In any state, if the query is fetching at any time (including background refetching) `isFetching` will be `true`.

### For most queries, it's usually sufficient to check for the `isPending` state, then the `isError` state, then finally, assume that the data is available and render the successful state:

```tsx
function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

### If `booleans` aren't your thing, you can always use the status state as well:

```tsx
function Todos() {
  const { status, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  });

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  // also status === 'success', but "else" logic works, too
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

- TypeScript will also narrow the type of `data` correctly if you've checked for `pending` and `error` before accessing it.

### Error in map()

- If not write this code we get an error map is not a function

```tsx
if (isPending) {
  return <div>Loading...</div>;
}
if (isError) {
  return <div>Error: {error.message}</div>;
}
```

- `Uncaught TypeError: Cannot read properties of undefined (reading 'map')`
- That is happen just bcs we trying to loop over the data before data actually exists.
- There is a loading state for this query, `isLoading, isPending` you can what ever.
- So that means we must write this code before return, or just add `?` after the data like this
- `{data?map(item=> (<div key={item.name}>{item.name}</div>))}`

```tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function App() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => axios.get('https://pokeapi.co/api/v2/pokemon').then((res) => res.data.results),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <h1>Pokemon Lists:</h1>
      <div>
        {data.map((item) => (
          <div key={item.name}>{item.name}</div>
        ))}
      </div>
    </main>
  );
}

export default App;
```
