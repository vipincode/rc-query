# Intro

Every time when we focus on windows, Query are stale, get refetch on background automatically

## But what make a query stale

Well technically out of the box react query very aggressive and mark query as stale as soon as they resolve, you noticed as soon as `query` is fetching mark as `stale`, which means it ready for refetch.

### So how to control this refetching

So we notice pokemon data not updated quickly [not change often], so here we can add a `staleTime` configuration to this specific pokemon query, so that it not refetch often. Ex `staleTime: 5000` means 5 seconds, this means `for the 5 seconds query is going to be considered fresh before gets mark as stale`.

In the duration when query is fresh, when focus on windows we see query is not updated, but after query is mark as stale, then it work[means query refetch]

```tsx
const { isLoading, isError, data, error } = useQuery({
  queryKey: ['pokemon'],
  queryFn: () => axios.get('https://pokeapi.co/api/v2/pokemon').then((res) => res.data.results),
  staleTime: 1000,
  refetchOnWindowFocus: false,
});
```

[See the query configuration like...](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)

- staleTime: 1000,
- refetchOnWindowFocus: false,

### StaleTime:

- Query refetch after assign a time `staleTime: 10000,` so this refetch the quey after one second.
- `staleTime: 5000,` this means for the 5 second query mark a fresh before its mark as stale.
- `staleTime: infinity`, query never become stale.
- `staleTime: 0`, by default it stale as soon refetch so you always see query is stale in devtool.
- `stale` time can be any time you in milliseconds,
- While a query is `fresh` it won't automatically refetch in background when refocus on the window.
- But as soon its become `stale`, And refocused the windows, it will automatically refetch in background again.
- Why we do all that, bcs we need to put our data up to date.
- Ex. someone click on tab and then back, expect up to date data .
- In this situation refetch any query that mark as stale.
