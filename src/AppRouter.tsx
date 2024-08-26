import React from 'react';
import {Text, View} from 'react-native';
import CurrentLocation from './components/CurrentLocation';
import WatchLocation from './components/WatchLocation';
import LibBackgroundActions from './components/LibBackgroundActions';
import LibGoogleMap from './components/GoogleMaps/LibGoogleMap';
// import LibExpoTask from './components/LibExpoTask';
// import LibBackgroundGeolocation from './components/LibBackgroundGeolaction';
// import LibBackgroundFetch from './components/LibBackgroundFetch';
// import LibBackgroundActions from './components/LibBackgroundActions';

export default function AppRouter() {
  return (
    <>
      <View
        style={{
          marginTop: 32,
          paddingHorizontal: 16,
        }}>
        <Text style={{fontSize: 24, fontWeight: '900'}}>Locations</Text>
        <CurrentLocation />
        <WatchLocation />

        <View style={{marginBottom: 8}} />
        {/* <LibExpoTask /> */}

        <View style={{marginBottom: 8}} />
        {/* <LibBackgroundGeolocation /> */}
        {/* <LibBackgroundFetch /> */}
        <LibBackgroundActions />

        <View style={{marginBottom: 8}} />
        <LibGoogleMap />
      </View>
    </>
  );
}
