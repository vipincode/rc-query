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
