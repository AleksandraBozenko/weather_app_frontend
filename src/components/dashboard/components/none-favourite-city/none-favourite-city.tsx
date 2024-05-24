import { FC } from 'react';
import { Card } from '@mui/material';

export const NoneFavouriteCity: FC = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: '16px',
        borderRadius: 0,
        boxShadow: 1,
      }}
    >
      <div>There is no favourite city yet</div>
    </Card>
  );
};
