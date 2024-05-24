import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Stack, Theme, useMediaQuery } from '@mui/material';
import { SideMenu } from '../drawer/drawer.tsx';
import { LogoIcon } from '../icons/logo-icon.tsx';

export const Layout: FC = () => {
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [openState, setOpenState] = useState(true);
  useEffect(() => {
    setOpenState(!mobile);
  }, [mobile]);

  return (
    <Box minHeight={'100vh'} position={'relative'}>
      {mobile && (
        <AppBar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            boxShadow: 1,
          }}
        >
          <LogoIcon height={90} width={120} />
          <IconButton
            onClick={() => {
              setOpenState(!openState);
            }}
          >
            {openState ? <CloseIcon sx={{ fontSize: '30px' }} /> : <MenuIcon sx={{ fontSize: '30px' }} />}
          </IconButton>
        </AppBar>
      )}
      <SideMenu openState={openState} mobile={mobile} />
      <Stack
        flexDirection="column"
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        spacing={0}
        sx={{
          pl: mobile ? 1 : '290px',
          pr: mobile ? 1 : '10px',
        }}
      >
        <Outlet />
      </Stack>
    </Box>
  );
};
