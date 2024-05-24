import { FC } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router';
import { format } from 'date-fns';
import { enqueueSnackbar } from 'notistack';
import { Box, Button, Card, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { enviroment } from '../../../enviroments.ts';
import { LoadingComponent } from '../loading-component/loading-component.tsx';
import { SearchCity } from '../search-city/search-city.tsx';
import { DataItem } from './components/data-item/data-item.tsx';
import { DayItem } from './components/day-item/day-item.tsx';
import { NoneFavouriteCity } from './components/none-favourite-city/none-favourite-city.tsx';
import { useDeleteRemoveFavouriteCity } from './hooks/use-delete-remove-favourite-city.ts';
import { useGetCityData } from './hooks/use-get-city-data.ts';
import { useGetFavoriteCity } from './hooks/use-get-favourite-city.ts';
import { useGetForecastWeatherData } from './hooks/use-get-forecast-weather-data.ts';
import { usePostAddFavouriteCity } from './hooks/use-post-add-favourite-city.ts';
import { usePostAddFollowedCity } from './hooks/use-post-add-followed-city.ts';

export const Dashboard: FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const {
    data: favoriteCityData,
    isLoading: loadingFavoriteCityData,
    refetch: refetchFavoriteCityData,
  } = useGetFavoriteCity();
  const { data: cityData, isLoading: loadingCityData } = useGetCityData(
    cityId ? cityId : favoriteCityData?.cityId || '',
  );
  const { data: forecastWeatherData, isLoading: loadingForecastWeatherData } = useGetForecastWeatherData(
    cityId ? cityId : favoriteCityData?.cityId || '',
  );

  const onSuccess = () => {
    enqueueSnackbar('Preferences saved successfully', { variant: 'success' });
    refetchFavoriteCityData();
  };

  const onError = () => {
    enqueueSnackbar('Preferences saving failed', { variant: 'error' });
  };

  const { mutate: AddFavoriteCity } = usePostAddFavouriteCity({
    onSuccess,
    onError,
  });

  const { mutate: removeFavoriteCity } = useDeleteRemoveFavouriteCity({
    onSuccess,
    onError,
  });

  const { mutate: addSavedCity } = usePostAddFollowedCity({
    onSuccess,
    onError,
  });

  const loading = loadingFavoriteCityData || loadingCityData || loadingForecastWeatherData;
  const hasFavoriteCity = !!favoriteCityData && !!favoriteCityData.cityId;

  const todayDate = format(new Date(), 'dd.MM.yyyy');
  const dayOfWeek = format(new Date(), 'EEEE');

  const loadingState = loadingFavoriteCityData || loadingCityData || loadingForecastWeatherData;

  if (loadingState) {
    return <LoadingComponent />;
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <SearchCity />
      <Stack
        direction="column"
        sx={{
          mt: 2,
          width: '100%',
        }}
      >
        <Stack mt={1} gap={2} flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap">
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'row',
              p: 4,
              borderRadius: 2,
              boxShadow: 1,
              height: 240,
              width: 610,
            }}
          >
            <Stack mr={10}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '45px',
                }}
                variant="h6"
              >
                {cityData?.name}
              </Typography>
              <Typography
                sx={{
                  color: '#FFC700',
                  fontWeight: 'bold',
                  fontSize: '70px',
                }}
                variant="body1"
              >
                {Math.round(cityData?.main.temp || 0)}°C
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4,
                m: 4,
              }}
            >
              {
                <img
                  src={enviroment.IMAGE_URL + cityData?.weather[0].icon + '.png'}
                  alt="weather icon"
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                />
              }
            </Box>
          </Card>
          <Card
            sx={{
              background: (theme) => theme.palette.primary.main,
              display: 'flex',
              flexDirection: 'column',
              p: 4,
              borderRadius: 2,
              boxShadow: 1,
              height: 240,
              width: 300,
            }}
          >
            <Typography fontWeight="bold" fontSize="45px" variant="h6">
              {todayDate}
            </Typography>
            <Typography fontSize="35px" variant="body1">
              {dayOfWeek}
            </Typography>
          </Card>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 4,
              gap: 2,
              borderRadius: 2,
              boxShadow: 1,
              height: 240,
              width: 300,
            }}
          >
            <Button
              sx={{
                background: (theme) => theme.palette.primary.dark,
                color: (theme) => theme.palette.common.black,
              }}
              onClick={() => {
                AddFavoriteCity(cityId || '');
              }}
            >
              Add to HOME
            </Button>
            <Button
              sx={{
                background: (theme) => theme.palette.primary.dark,
                color: (theme) => theme.palette.common.black,
              }}
              onClick={() => {
                // @ts-ignore
                removeFavoriteCity();
              }}
            >
              Remove from HOME
            </Button>
            <Button
              sx={{
                background: (theme) => theme.palette.primary.dark,
                color: (theme) => theme.palette.common.black,
              }}
              onClick={() => {
                addSavedCity(cityId ? cityId : favoriteCityData?.cityId || '');
              }}
            >
              Add to SAVED CITIES
            </Button>
          </Card>
        </Stack>
        <Stack mt={3} gap={2} flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap">
          <DataItem keyName={'Sunrise'} data={format((cityData?.sys?.sunrise || 0) * 1000 || 0, 'HH:mm')} />
          <DataItem keyName={'Sunset'} data={format((cityData?.sys?.sunset || 0) * 1000 || 0, 'HH:mm')} />
          <DataItem keyName={'Visibility'} data={cityData?.visibility || ''} text={'m'} />
          <DataItem keyName={'Pressure'} data={cityData?.main?.pressure || ''} text={'hPa'} />
          <DataItem keyName={'Temp min'} data={cityData?.main?.temp_min || ''} text={'°C'} />
          <DataItem keyName={'Temp max'} data={cityData?.main?.temp_max || ''} text={'°C'} />
          <DataItem keyName={'Humidity'} data={cityData?.main?.humidity || ''} text={'%'} />
          <DataItem keyName={'Wind speed'} data={cityData?.wind.speed || ''} text={'m/s'} />
        </Stack>

        <Stack mt={3} gap={2} flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap">
          {!mobile &&
            forecastWeatherData?.list.map((item, index) => (
              <DayItem
                key={index}
                day={format(item.dt_txt, 'dd.MM')}
                temperature={Math.round(item.main.temp) || ''}
                iconUrl={enviroment.IMAGE_URL + item.weather[0].icon + '.png'}
              />
            ))}

          {mobile && (
            <Carousel
              autoPlay={false}
              animation={'slide'}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              {forecastWeatherData?.list.map((item, index) => (
                <DayItem
                  isMobile
                  key={index}
                  day={format(item.dt_txt, 'dd.MM')}
                  temperature={Math.round(item.main.temp) || ''}
                  iconUrl={enviroment.IMAGE_URL + item.weather[0].icon + '.png'}
                />
              ))}
            </Carousel>
          )}
        </Stack>
      </Stack>
      {!loading && !hasFavoriteCity && <NoneFavouriteCity />}
    </Stack>
  );
};
