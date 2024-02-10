# Introduction

Its very common when building application they utilize asynchronous data or server side data, that you have two types of request that happen

```tsx
function Post() {
  // axios.get(`https://jsonplaceholder.typicode.com/posts`);
}
```

```tsx
function Post() {
  // axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`);
}
```

- One request go out and fetch list of thing, or multiple items of thing
- And other goes out and fetch individual items
- And usually a big relationship between those two thing. that is fetch all post and click one of that post and see individual post.

## Lets understand it by fetching a `posts`, and see individual detail by `postId`

- First create to components `posts` and `post`
- `Posts` have all posts listed, and by clicking on in a post link we see related data.
- Now create `PostPage` and list these components
- And finally add `PostPage` inside main page

## Explanation

PostPage have posts and post page linked, first we create an state for that, and check if postId less than greater than, based on that we render our components and pass postId as props and receive it inside the components, After that we fetch data, and revert back.

### Step: 1 `Posts` component

```tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import delay from 'delay';

interface Props {
  setPostId: (id: number) => void;
}

// receive posts props
const Posts = ({ setPostId }: Props) => {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      await delay(1000); // Just want to see loading state, otherwise no need for this.
      return axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => res.data);
    },
    // You can also write query like this.
    OR,
    queryFn: () => {
      axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => res.data);
    },
    OR
    queryFn: async () => {
      await axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => res.data);
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

      {/* This is for to for background loading indicator, query is fetching background */}
      {/* This is usually happen when query is cache, and then it fetch */}
      {isFetching ? <div>Data fetching...</div> : null}
    </div>
  );
};

export default Posts;
```

### Step: 2 `Post` component

```tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  postId: number;
  setPostId: (id: number) => void;
}

// receive post props
const Post = ({ postId, setPostId }: Props) => {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['post', postId], // Fetch data based on props.
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
      {isFetching ? <div>Data fetching...</div> : null}
    </div>
  );
};

export default Post;
```

### Step: 3 `PostPage`

```tsx
import { useState } from 'react';
import Posts from './components/Posts';
import Post from './components/Post';

const PostPage = () => {
  const [postId, setPostId] = useState(-1);
  return (
    <div>
      {postId > -1 ? (
        <Post
          postId={postId} // pass props
          setPostId={setPostId} // pass props
        />
      ) : (
        <Posts setPostId={setPostId} /> // pass props
      )}
    </div>
  );
};

export default PostPage;
```

### Step:4 `App` page

```tsx
import PostPage from './PostPage';

function App() {
  return (
    <>
      <PostPage />
    </>
  );
}

export default App;
```
