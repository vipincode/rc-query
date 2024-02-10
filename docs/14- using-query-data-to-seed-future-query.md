# Push approach

Alternatively, you can create detail caches whenever you fetch the list query. This has the advantage that staleness is automatically measured from when the list was fetched, because, well, that's when we create the detail entry.

However, there is no good callback to hook into when a query is fetched. The global onSuccess callback on the cache itself might work, but it would be executed for every query, so we'd have to narrow it down to the right query key.

The best way I've found to execute the push approach is to do it directly in the queryFn, after data has been fetched:

```tsx
const usePosts = (id: number) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['post', post.id],
    queryFn: async () => {
      const posts = await fetchPosts();
      posts.forEach((post) => {
        // ⬇️ create a detail cache for each item
        queryClient.setQueryData(['posts', post.id], post);
      });
      return posts;
    },
  });
};
```

- This caches all individual data in cache, you see it in dev tool.

This would create a detail entry for each item in the list immediately. Since there is no one interested in those queries at the moment, those would be seen as inactive, which means they might be garbage collected after `gcTime` has elapsed (default: 15 minutes).

So if you use the push approach, the detail entries you've created here might no longer be available once the user actually navigates to the detail view. Also, if your list is long, you might be creating way too many entries that will never be needed.

🟢 staleTime is automatically respected
🟡 there is no good callback
🟡 might create unnecessary cache entries
🔴 pushed data might be garbage collected too early

Keep in mind that both approaches only work well if the structure of your detail query is exactly the same (or at least assignable to) the structure of the list query. If the detail view has a mandatory field that doesn't exist in the list, seeding via initialData is not a good idea. This is where placeholderData comes in, and I've written a comparison about the two in` #9: Placeholder and Initial Data in React Query.`
