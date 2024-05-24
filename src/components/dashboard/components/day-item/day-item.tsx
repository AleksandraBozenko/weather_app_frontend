import { FC } from 'react';
import { Card, Typography } from '@mui/material';

type Props = {
  day: string;
  temperature: string | number;
  iconUrl: string;
  isMobile?: boolean;
};

export const DayItem: FC<Props> = ({ day, temperature, isMobile, iconUrl }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        borderRadius: 2,
        boxShadow: 1,
        width: isMobile ? '100%' : '150px',
        height: 300,
        m: 2,
      }}
    >
      <Typography variant="h6">{day}</Typography>
      <img src={iconUrl} alt="weather icon" style={{ width: '100px', height: '100px' }} />
      <Typography variant="body1">{temperature}°C</Typography>
    </Card>
  );
};
