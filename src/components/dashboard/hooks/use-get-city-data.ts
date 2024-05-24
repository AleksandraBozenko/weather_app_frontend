import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';

export type CityData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
};

export const useGetCityData = (cityId: string) => {
  return useQuery<CityData, AxiosError>({
    queryKey: ['cityData', cityId],
    queryFn: async () => {
      const response = await httpClient.get<CityData>(`weather/${cityId}`);
      return {
        ...response.data,
      };
    },
    enabled: !!cityId,
  });
};
