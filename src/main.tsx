import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ReactKeycloakProvider } from '@react-keycloak-fork/web';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import { keycloakInitOptions, keycloakInstance } from './common/keycloak/config.ts';
import { PageContextProvider } from './components/page-context/page-context.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <ReactKeycloakProvider authClient={keycloakInstance} initOptions={keycloakInitOptions}>
          <PageContextProvider>
            <App />
          </PageContextProvider>
        </ReactKeycloakProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
