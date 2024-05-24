import { useKeycloak } from '@react-keycloak-fork/web';

export const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();

  return {
    logout: keycloak.logout,
    token: keycloak.token,
    tokenParsed: keycloak.tokenParsed,
    authenticated: initialized && keycloak.authenticated,
  };
};
