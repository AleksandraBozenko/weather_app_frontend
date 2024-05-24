import { FC } from 'react';
import { Button, Card, Stack } from '@mui/material';
import { useAuth } from '../../common/keycloak/hooks/use-auth.ts';
import { LogoIcon } from '../icons/logo-icon.tsx';
import { DrawerItem } from './components/drawer-item.tsx';

type Props = {
  openState: boolean;
  mobile: boolean;
};

export const SideMenu: FC<Props> = ({ openState, mobile }) => {
  const { logout } = useAuth();
  return (
    <Card
      sx={{
        height: '100%',
        position: 'fixed',
        width: mobile ? '100%' : '256px',
        left: 0,
        zIndex: 10,
        borderRadius: 0,
        display: openState ? 'block' : 'none',
      }}
    >
      <Stack pt={mobile ? '110px' : 0} pb="24px" justifyContent="center" flexDirection="column" spacing={2}>
        {!mobile && <LogoIcon />}
        <DrawerItem label="Home" path={'/'} exact />
        <DrawerItem label="Saved Cities" path={'/followedCities'} />
        <DrawerItem label="Settings" path={'/settings'} />
      </Stack>
      <Button
        sx={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          backgroundColor: 'red',
          width: 'calc(100% - 32px)',
        }}
        variant="outlined"
        fullWidth
        onClick={() => logout()}
      >
        Wyloguj
      </Button>
    </Card>
  );
};
