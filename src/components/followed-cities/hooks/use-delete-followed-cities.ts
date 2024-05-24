import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';

type UseUpdateFavouriteCityOptions = {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
};

const deleteFollowedCity = async (cityId: string) => {
  const { data } = await httpClient.delete(`/FollowedCity?cityId=${cityId}`);
  return data;
};

export const useDeleteFollowedCity = (options?: UseUpdateFavouriteCityOptions) => {
  return useMutation<string, Error, string, unknown>({
    mutationFn: deleteFollowedCity,
    onError: (error) => {
      options?.onError?.(error);
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
  });
};
