import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';

export type FollowedCities = {
  cityId: string;
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}[];

export const useGetCityData = () => {
  return useQuery<FollowedCities, AxiosError>({
    queryKey: ['followedCities'],
    queryFn: async () => {
      const response = await httpClient.get<FollowedCities>(`/FollowedCity`);
      return response.data;
    },
  });
};
