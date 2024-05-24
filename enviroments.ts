/// <reference types="vite/client" />
type Enviroments = {
  CLIENT_ID: string;
  REALM: string;
  AUTH_URL: string;
  APP_URL: string;
  IMAGE_URL: string;
};

export const enviroment: Enviroments = {
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID as string,
  APP_URL: import.meta.env.VITE_APP_URL as string,
  REALM: import.meta.env.VITE_REALM as string,
  AUTH_URL: import.meta.env.VITE_AUTH_URL as string,
  IMAGE_URL: import.meta.env.VITE_IMAGE_URL as string,
};
