import React, {useEffect} from 'react';
import LocationsRouter from './components/LocationsRouter';
import {testApi} from './api-utils';

export default function AppRouter() {
  useEffect(() => {
    testApi();
  }, []);

  return (
    <>
      <LocationsRouter />
    </>
  );
}
