import { FC } from 'react';
import { Card, Typography } from '@mui/material';

type Props = {
  keyName: string;
  data: string | number;
  text?: string;
};

export const DataItem: FC<Props> = ({ data, keyName, text }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderRadius: 2,
        boxShadow: 1,
        minWidth: '300px',
      }}
    >
      <Typography variant="body1">{keyName}:</Typography>
      <Typography variant="body1">
        {data} {text}
      </Typography>
    </Card>
  );
};
