import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';

export type City = {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type ResponseCity = City[];

export const useGetCities = (cityName: string) => {
  return useQuery<ResponseCity, AxiosError>({
    queryKey: ['CitySearch', cityName],
    queryFn: async () => {
      const response = await httpClient.get<ResponseCity>(`/City?cityName=${cityName}`);
      return response.data;
    },
    enabled: !!cityName,
  });
};
