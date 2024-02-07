# Intro

A dependent query is a query that relies on data from a previous query completing before it can run.
[Docs link](https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries)

```tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import delay from 'delay';

const email = 'Sincere@april.biz';

const MyPost = () => {
  const { data: user } = useQuery({
    queryKey: ['post', email],
    queryFn: async () => {
      await delay(1000);
      return axios.get(`https://jsonplaceholder.typicode.com/users?email=${email}`).then((res) => res.data[0]);
    },
  });

  const userId = user?.id;

  const { data: posts, status } = useQuery({
    queryKey: ['post', userId],
    queryFn: async () => {
      await delay(1000);
      return axios.get(`https://jsonplaceholder.typicode.com/users?userId=${userId}`).then((res) => res.data);
    },
    /**
     * The query will not execute until the userId exists
     * So that means this query depend on previous query.
     */
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Oops something went wrong.. {error.message}</div>;
  if (status === 'pending') return <div>Data loading...</div>;
  return (
    <div>
      <div>User Id : {user.id}</div>
      <div>User Name : {user.name}</div>
      <div>Post Count: {posts?.length}</div>
      {isFetching ? <div>Data fetching..</div> : null}
    </div>
  );
};

export default MyPost;
```

- Not one thing, depending query does not have loading state `isLoading, isError, error, isFetching,` like most other query do,
- It actually start a state called `idle`
- So you can check data loading state like this
- `if (status === 'pending') return <div>Data loading...</div>;`

```tsx
status: 'pending';
isPending: true;
fetchStatus: 'idle';
```
