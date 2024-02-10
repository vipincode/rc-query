import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  postId: number;
  setPostId: (id: number) => void;
}

const Post = ({ postId, setPostId }: Props) => {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) => res.data),
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
        <h3>{data.title}</h3>
        <p>{data.body}</p>
      </div>
      {isFetching ? <div>Data fetching...</div> : ''}
    </div>
  );
};

export default Post;
