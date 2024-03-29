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
