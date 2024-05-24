import axios from 'axios';
import { enviroment } from '../../../enviroments.ts';
import { keycloakInstance } from '../keycloak/config.ts';

const getAuthorizationHeaders = () => {
  const { token } = keycloakInstance;
  return {
    Authorization: `Bearer ${token}`,
  };
};
const createClient = (baseURL: string) => {
  const instance = axios.create({ baseURL });
  instance.interceptors.request.use(async (request) => {
    request.headers = getAuthorizationHeaders() as never;
    request.headers['Content-Type'] = 'application/json';
    return request;
  });
  instance.interceptors.response.use(async (response) => {
    if (response.status === 401) {
      keycloakInstance.clearToken();
    }
    return response;
  });
  return instance;
};

export const httpClient = createClient(enviroment.APP_URL);
