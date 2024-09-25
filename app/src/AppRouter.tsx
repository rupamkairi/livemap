import React, {useEffect} from 'react';
import LocationsRouter from './components/LocationsRouter';
// import {testApi} from './api-utils';
import {SafeAreaView} from 'react-native';

export default function AppRouter() {
  // useEffect(() => {
  //   testApi();
  // }, []);

  return (
    <>
      <SafeAreaView>
        <LocationsRouter />
      </SafeAreaView>
    </>
  );
}
