# Intro

TanStack Query provides each query function with an `AbortSignal instance`. When a query becomes out-of-date or inactive, this `signal` will become aborted. This means that all queries are cancellable, and you can respond to the cancellation inside your query function if desired. The best part about this is that it allows you to continue to use normal async/await syntax while getting all the benefits of automatic cancellation.

The `AbortController` API is available in most runtime environments, but if your runtime environment does not support it, you will need to provide a polyfill. There are several available.

[See the docs](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation)

## Default behavior

By default, queries that unmount or become unused before their promises are resolved are not cancelled. This means that after the promise has resolved, the resulting data will be available in the cache. This is helpful if you've started receiving a query, but then unmount the component before it finishes. If you mount the component again and the query has not been garbage collected yet, data will be available.

However, if you consume the `AbortSignal`, the Promise will be cancelled (e.g. aborting the fetch) and therefore, also the Query must be cancelled. Cancelling the query will result in its state being reverted to its previous state.

## Using fetch

```tsx
const query = useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch('/todos', {
      // Pass the signal to one fetch
      signal,
    });
    const todos = await todosResponse.json();

    const todoDetails = todos.map(async ({ details }) => {
      const response = await fetch(details, {
        // Or pass it to several
        signal,
      });
      return response.json();
    });

    return Promise.all(todoDetails);
  },
});
```

## Using axios

```tsx
import axios from 'axios';

const query = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) =>
    axios.get('/todos', {
      // Pass the signal to `axios`
      signal,
    }),
});
```
