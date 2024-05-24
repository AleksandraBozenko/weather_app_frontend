import { FC } from 'react';
import { Card, FormLabel, Stack, Switch } from '@mui/material';
import { usePageContext } from '../page-context/page-context.tsx';

export const Settings: FC = () => {
  const { darkModeState } = usePageContext();

  return (
    <Stack>
      <Card
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <FormLabel>Dark mode</FormLabel>
        <Switch onChange={(e) => darkModeState.setValue(e.target.checked)} value={darkModeState.value} />
      </Card>
    </Stack>
  );
};
