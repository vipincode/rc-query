# Docs

## Window Focus Refetching

If a user leaves your application and returns and the query data is stale, `TanStack Query automatically requests fresh data for you in the background`. You can disable this globally or per-query using the `refetchOnWindowFocus` option:

```tsx
//Disabling Globally
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>;
}
```

## Disabling Per-Query

```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  refetchOnWindowFocus: false,
});
```

### refetchOnWindowFocus: [false or false],

- When some focus on windows the query will refetch,
- If make it `false` so this is not going to be refetch.
- if it is `true` so it fetch query when windows is focus.
- default value is `true`.

### Benefits

- React does this, bcs your data is up to date as possible
- This is very passible people click on tabs and back, come back latter and aspect everything is up to date.
- So that's why use this opportunity to refetch any query on the page that mark as stale.

## Query fetching indicators

```tsx
<main>
  <h1>Pokemon Lists:</h1>
  <div>
    {data.map((item) => (
      <div key={item.name}>{item.name}</div>
    ))}
  </div>
  <div>{isFetching ? 'Updating...' : null}</div>
</main>
```

```tsx
const { isLoading, isError, data, error, isFetching } = useQuery({
  queryKey: ['pokemon'],
  queryFn: async () => {
    await delay(1000);
    return axios.get('https://pokeapi.co/api/v2/pokemon').then((res) => res.data.results);
  },
  staleTime: 0,
  // refetchOnWindowFocus: false,
});
```

- `<div>{isFetching ? 'Updating...' : null}</div>` you see this ui on page, when focus on page.
- If not seen indicators pls add some delay during fetching the query `await delay(1000);`
