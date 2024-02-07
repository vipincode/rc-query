import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import delay from 'delay';

export const usePokemon = () => {
  return useQuery({
    queryKey: ['pokemon'],
    queryFn: async () => {
      await delay(1000);
      return axios.get('https://pokeapi.co/api/v2/pokemon').then((res) => res.data.results);
    },
    gcTime: 500,
  });
};

export const useSearchPokemon = (searchPokemon: string) => {
  return useQuery({
    queryKey: ['pokemon', searchPokemon],
    queryFn: async ({ signal }) => {
      await delay(1000);
      return axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`, { signal }).then((res) => res.data);
    },
    enabled: !!searchPokemon,
    // retry: 1,
    // retryDelay: 1000,
  });
};

export const useBerry = () => {
  return useQuery({
    queryKey: ['berry'],
    queryFn: async () => {
      await delay(1000);
      return axios.get('https://pokeapi.co/api/v2/berry').then((res) => res.data.results);
    },
    gcTime: 500,
  });
};
