import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {Button, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {agentSlice} from '../../stores/agent.slice';
import {startWatch, stopWatch} from '../../utils/geoloaction-watch';

Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
  skipPermissionRequests: true,
  enableBackgroundLocationUpdates: true,
});

export default function WatchLocation() {
  const watchId = useSelector(agentSlice.selectors.selectWatchId);

  return (
    <View>
      <View style={{marginBottom: 8}}>
        {watchId !== null ? (
          <Button
            title="Stop Watching"
            onPress={() => {
              stopWatch();
            }}
          />
        ) : (
          <Button
            title="Start Watching"
            onPress={() => {
              startWatch();
            }}
          />
        )}
      </View>
      <Text variant="bodySmall" style={{color: 'red'}}>
        ** Make sure to Enable the Background Location Permission from the "App
        Info", then "Permissions", then "Location", then select "All the time".
      </Text>
      <Text variant="bodySmall" style={{color: 'red'}}>
        ** Watch should run with the "Allow only while using the app" Permission
        as well.
      </Text>
    </View>
  );
}
