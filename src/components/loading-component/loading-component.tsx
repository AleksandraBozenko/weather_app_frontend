import { CircularProgress, Stack } from '@mui/material';

export const LoadingComponent = () => (
  <Stack
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <CircularProgress />
  </Stack>
);
