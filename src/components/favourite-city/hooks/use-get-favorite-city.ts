import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';
import { FavouriteCity } from '../types/favourite-city-types.ts';

export const UseGetFavoriteCity = () => {
  return useQuery<FavouriteCity, AxiosError>({
    queryKey: ['FavouriteCity'],
    queryFn: async () => {
      const response = await httpClient.get<FavouriteCity>(`/FavouriteCity`);
      return response.data;
    },
  });
};
