# Intro

[Rename `cacheTime` to `gcTime` this is migration form v4 to v5]

- So for we have learn `fetching state`, `stale state` and` fresh state`, for our queries.
- But there is another one, if you want to learn react query effectively and understand how react query managing our data, this last sate is called `inactive state`.
- And its happen when query is no longer has been used in screen.
- Ex, lets hide our pokemon data, you notice the pokemon query grayed out in devtools, and there is an `inactive state` labeled on that query. [means inactive label is active in devtool just like query is stale]
- this means query data is no longer in use, but we still have in memory in case if we need to use it again. now if show the data the state is back, and query is active. thats happen bcs we have data still in memory. note when data is back it fetched and give up to date data.
- By default react query will keep `inactive data` around in our application `5 min`. So when something is not used in 5 min, it discard the data and fetch again latter if you needed it.

- But we handle cache time manually, `gcTime: 5000,` this is 5 second cache time, after 5 seconds the query is going to be garbage collected
- You can also set the `gcTime: 0` this as soon as data is not used it going to be garbage collected.
- `gcTime: infinity` we never delete data in cache

```tsx
const { isLoading, isError, data, error, isFetching } = useQuery({
  queryKey: ['pokemon'],
  queryFn: async () => {
    await delay(1000);
    return axios.get('https://pokeapi.co/api/v2/pokemon').then((res) => res.data.results);
  },
  // staleTime: 0,
  // refetchOnWindowFocus: false,
  gcTime: 5000,
});
```
