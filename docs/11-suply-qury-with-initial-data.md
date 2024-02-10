# Initial Query Data

There are many ways to supply initial data for a query to the cache before you need it:
[Docs](https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data)

### Declaratively:

- Provide initialData to a query to prepopulate its cache if empty

### Imperatively:

- Prefetch the data using queryClient.prefetchQuery
- Manually place the data into the cache using queryClient.setQueryData

## Using initialData to prepopulate a query

There may be times when you already have the initial data for a query available in your app and can simply provide it directly to your query. If and when this is the case, you can use the config.initialData option to set the initial data for a query and skip the initial loading state!

- IMPORTANT: `initialData` is persisted to the cache, so it is not recommended to provide placeholder, partial or incomplete data to this option and instead use `placeholderData`

```tsx
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
});
```

## `staleTime` and `initialDataUpdatedAt`

By default, `initialData` is treated as totally fresh, as if it were just fetched. This also means that it will affect how it is interpreted by the `staleTime` option.

- If you configure your query observer with `initialData`, and no `staleTime` (the default `staleTime: 0`), the query will immediately refetch when it mounts:

```tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import delay from 'delay';
import existingUser from '../data/existingUser';

const email = 'Sincere@april.biz';

const InitialData = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['user', email],
    queryFn: async () => {
      await delay(1000);
      return axios.get(`https://jsonplaceholder.typicode.com/users?email=${email}`).then((res) => res.data[0]);
    },
    initialData: existingUser,
    staleTime: 1000,
  });
  if (isLoading) return <div>Loading.......</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
      {JSON.stringify(user)}
      {isFetching ? <div>Data is fetching...</div> : ''}
    </div>
  );
};

export default InitialData;
```
