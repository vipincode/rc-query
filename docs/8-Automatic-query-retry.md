# Intro

- When a query failed, it automatically retry query fetch three times with little delay in between to see it it can get the data, this called exponential backoff

- Every it it retry to get the query it take little bit longer time to previous one.

- When our api break you can see it network tab

```tsx
export const useSearchPokemon = (searchPokemon: string) => {
  return useQuery({
    queryKey: ['pokemon', searchPokemon],
    queryFn: async () => {
      await delay(1000);
      return axios.get(`https://pokeapi.co/api/v2/pokemon1/${searchPokemon}`).then((res) => res.data);
    },
    enabled: !!searchPokemon,
    retry: 1,
    retryDelay: 1000,
  });
};
```

## retry: 1 | 0 | false | true

- We can manage the query refetching , by `retry` configuration, 1 means it fetch only one time
- In the between when query try to fetching data, you see loading indicator, it not show the error, sow you can manage delay between query retry by `retryDelay: 1000` 1000 means on seconds. So after one seconds you can error on screen or network tab.
- For more advance you can pass a retryDelay function see docs for more.
