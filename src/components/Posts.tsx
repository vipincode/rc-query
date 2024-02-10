import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import delay from 'delay';

interface Props {
  setPostId: (id: number) => void;
}

const Posts = ({ setPostId }: Props) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      await delay(1000); // Just want to see loading state, otherwise no need for this.
      return axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => res.data);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
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
