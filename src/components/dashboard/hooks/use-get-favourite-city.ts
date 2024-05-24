import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';

export type FavoriteCity = {
  cityId: string;
};

export const useGetFavoriteCity = () => {
  return useQuery<FavoriteCity, AxiosError>({
    queryKey: ['favoriteCity'],
    queryFn: async () => {
      const response = await httpClient.get<FavoriteCity>(`FavouriteCity`);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
