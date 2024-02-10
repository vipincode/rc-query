```tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import delay from 'delay';
import { useReducer } from 'react';

interface Props {
  setPostId: (id: number) => void;
}

const fetchPosts = async () => {
  await delay(1000);

  const posts = await axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => res.data);

  return posts;
};

const Posts = ({ setPostId }: Props) => {
  const [count, increment] = useReducer((d) => d + 1, 0);

  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    refetchOnWindowFocus: () => {
      increment();
      return true;
    },
    //  refetchOnReconnect: increment,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts: {count}</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <a
              onClick={(e) => {
                e.preventDefault();
                setPostId(post.id);
              }}
              href=''
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>

      {isFetching ? <div>Data fetching...</div> : null}
    </div>
  );
};

export default Posts;
```
