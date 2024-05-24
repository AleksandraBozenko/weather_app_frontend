import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { usePageContext } from '../../page-context/page-context.tsx';

type Props = {
  label: string;
  path: string;
  exact?: boolean;
};

export const DrawerItem: React.FC<Props> = (props) => {
  const isActive = props.exact ? location.pathname === props.path : location.pathname.includes(props.path);
  const navigate = useNavigate();
  const { darkModeState } = usePageContext();
  return (
    <Box
      width="100%"
      onClick={() => {
        navigate(props.path);
      }}
      sx={{
        zIndex: 2,
        backgroundColor: isActive ? 'primary.dark' : 'transparent',
        cursor: 'pointer',
        color: darkModeState.value ? 'common.white' : 'common.black',
        p: 2,
        '&:hover': {
          backgroundColor: 'common.black',
          color: 'white',
        },
      }}
    >
      <Typography>{props.label}</Typography>
    </Box>
  );
};
