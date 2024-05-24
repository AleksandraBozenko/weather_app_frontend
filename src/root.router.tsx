import { FC } from 'react';
import { Route, Routes } from 'react-router';
import { NotFoundPage } from './components/404/not-found-page.tsx';
import { Dashboard } from './components/dashboard/dashboard.tsx';
import { FollowedCities } from './components/followed-cities/followed-cities.tsx';
import { Layout } from './components/layout/layout.tsx';
import { Settings } from './components/settings/settings.tsx';

export const RootRouter: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'cityDetails/:cityId'} element={<Dashboard />} />
        <Route path={'followedCities/:cityId'} element={<Dashboard />} />
        <Route path={'followedCities'} element={<FollowedCities />} />
        <Route path={'settings'} element={<Settings />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
