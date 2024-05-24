import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';

type UseUpdateFavouriteCityOptions = {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
};

const removeFavouriteCity = async () => {
  const { data } = await httpClient.delete(`/FavouriteCity`);
  return data;
};

export const useDeleteRemoveFavouriteCity = (options?: UseUpdateFavouriteCityOptions) => {
  return useMutation<string, Error, string, unknown>({
    mutationFn: removeFavouriteCity,
    onError: (error) => {
      options?.onError?.(error);
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
  });
};
