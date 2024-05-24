import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';

type UseUpdateFavouriteCityOptions = {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
};

const addFavouriteCity = async (cityId: string) => {
  const { data } = await httpClient.post(`/FavouriteCity?CityId=${cityId}`);
  return data;
};

export const usePostAddFavouriteCity = (options?: UseUpdateFavouriteCityOptions) => {
  return useMutation<string, Error, string, unknown>({
    mutationFn: addFavouriteCity,
    onError: (error) => {
      options?.onError?.(error);
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
  });
};
