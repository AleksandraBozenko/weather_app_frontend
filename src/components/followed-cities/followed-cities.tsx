import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Button, Card, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { enviroment } from '../../../enviroments.ts';
import { LoadingComponent } from '../loading-component/loading-component.tsx';
import { useDeleteFollowedCity } from './hooks/use-delete-followed-cities.ts';
import { useGetCityData } from './hooks/use-get-followed-cities-data.ts';

export const FollowedCities: FC = () => {
  const { data, isLoading, refetch } = useGetCityData();
  const navigate = useNavigate();
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const onSuccess = () => {
    enqueueSnackbar('City deleted successfully', { variant: 'success' });
    refetch();
  };

  const onError = () => {
    enqueueSnackbar('City deletion failed', { variant: 'error' });
  };

  const { mutate } = useDeleteFollowedCity({ onSuccess, onError });
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: '100%',
        padding: '16px',
        pt: mobile ? '110px' : 0,
      }}
    >
      <Stack direction="column" spacing={2}>
        {data?.map((city) => (
          <Card
            key={city.cityId}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderRadius: 2,
              boxShadow: 1,
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/followedCities/${city.cityId}`)}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                mutate(city.cityId);
              }}
            >
              Delete
            </Button>
            <Stack
              direction="column"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="body1">{city.name}</Typography>
              <Typography variant="body1">{city.main?.temp} °C</Typography>
            </Stack>
            <img
              src={enviroment.IMAGE_URL + city?.weather[0].icon + '.png'}
              alt="weather icon"
              style={{ width: '100px', height: '100px' }}
            />
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
