import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';
import { FavouriteCity } from '../types/favourite-city-types.ts';

type UseUpdateFavouriteCityOptions = {
  onSuccess?: (data: FavouriteCity) => void;
  onError?: (error: Error) => void;
};

const updateFavouriteCity = async (city: FavouriteCity) => {
  const { data } = await httpClient.post('/FavouriteCity', city);
  return data;
};

export const useUpdateFavouriteCity = (options?: UseUpdateFavouriteCityOptions) => {
  return useMutation<FavouriteCity, Error, FavouriteCity, unknown>({
    mutationFn: updateFavouriteCity,
    onError: (error) => {
      options?.onError?.(error);
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
  });
};
