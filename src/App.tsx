import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useAuth } from './common/keycloak/hooks/use-auth.ts';
import { LoadingComponent } from './components/loading-component/loading-component.tsx';
import { usePageContext } from './components/page-context/page-context.tsx';
import { RootRouter } from './root.router.tsx';

function App() {
  const { authenticated } = useAuth();
  const { darkModeState } = usePageContext();

  const theme = createTheme({
    palette: {
      mode: darkModeState.value ? 'dark' : 'light',
      background: {
        default: darkModeState.value ? '#121212' : '#E4E4E4',
      },
      primary: {
        main: '#fff',
        dark: '#FFC700',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkModeState.value ? '#252525' : '#F8F8F8',
          },
        },
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  if (!authenticated) {
    return <LoadingComponent />;
  }

  return (
    <ThemeProvider theme={theme}>
      <RootRouter />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
