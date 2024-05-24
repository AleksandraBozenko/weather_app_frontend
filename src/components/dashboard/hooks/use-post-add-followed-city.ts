import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';

type UseUpdateFavouriteCityOptions = {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
};

const addFollowedCity = async (cityId: string) => {
  const { data } = await httpClient.post(`/FollowedCity?CityId=${cityId}`);
  return data;
};

export const usePostAddFollowedCity = (options?: UseUpdateFavouriteCityOptions) => {
  return useMutation<string, Error, string, unknown>({
    mutationFn: addFollowedCity,
    onError: (error) => {
      options?.onError?.(error);
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
  });
};
