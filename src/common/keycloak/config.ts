import Keycloak from 'keycloak-js';
import { enviroment } from '../../../enviroments.ts';

export const keycloakInstance = new Keycloak({
  clientId: `${enviroment.CLIENT_ID}`,
  realm: `${enviroment.REALM}`,
  url: `${enviroment.AUTH_URL}`,
});

export const keycloakInitOptions = {
  redirectUri: window.location.href,
  pkceMethod: 'S256',
  onLoad: 'login-required',
  checkLoginIframe: false,
};
