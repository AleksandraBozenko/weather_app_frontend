import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../common/axios/http-client.ts';

export type ForecastWeatherData = {
  city: {
    name: string;
  };
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain: null;
    dt_txt: string;
    date: string;
  }[];
};

export const useGetForecastWeatherData = (cityId: string) => {
  return useQuery<ForecastWeatherData, AxiosError>({
    queryKey: ['forecast', cityId],
    queryFn: async () => {
      const response = await httpClient.get<ForecastWeatherData>(`weather/forecast/${cityId}`);
      return response.data;
    },
    enabled: !!cityId,
  });
};
