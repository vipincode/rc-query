# Introduction

- In previous we load all post data, and get individual data by clicking on link, and we see data loading
- In this duration we notice we have all data loaded in cache all ready but it fetch the background and data loading
- So we can use available data for one query to initial data for other.
- But note that this is not case for every situation, but if you do have data already available, then a trick react query provide that you can use one query data to initial data for other query.

[See docs for more information](https://tkdodo.eu/blog/seeding-the-query-cache)

## QueryClient

The `QueryClient` can be used to interact with a cache:

```tsx
const { data, isLoading, isError, error, isFetching } = useQuery({
  queryKey: ['post', postId],
  queryFn: () => axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) => res.data),
  initialData: () => console.log(queryClient.getQueryData(['posts']), 'Data'),
});
```

[More Detail See the Docs](https://tanstack.com/query/latest/docs/reference/QueryClient)

## How get cache data, And seed

```tsx
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  postId: number;
  setPostId: (id: number) => void;
}

interface Post {
  id: number;
  title: string;
  body: string;
  // Other properties of a post
}

const Post = ({ postId, setPostId }: Props) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isFetching } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) => res.data),
    initialData: () => {
      // Get the initial data from the cache using the key
      const postsData = queryClient.getQueryData<Post[]>(['posts']);
      // Perform the find operation on the retrieved data
      return postsData?.find((post) => post.id === postId);
    },
    // get the last fetch time of the list
    initialDataUpdatedAt: () => queryClient.getQueryState(['posts'])?.dataUpdatedAt,
  });

  if (isLoading) return <div>Loading post...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>
        <a
          onClick={(e) => {
            e.preventDefault();
            setPostId(-1);
          }}
          href=''
        >
          Back to home page
        </a>
      </div>
      <h1>Post</h1>
      <div>
        <h3>{data?.title}</h3>
        <p>{data?.body}</p>
      </div>
      {isFetching ? <div>Data fetching...</div> : ''}
    </div>
  );
};

export default Post;
```
