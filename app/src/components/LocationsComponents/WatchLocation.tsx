import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {postTrackingPosition} from '../../utils/api-calls';
import {Text} from 'react-native-paper';

Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
  skipPermissionRequests: true,
  enableBackgroundLocationUpdates: true,
});

export default function WatchLocation() {
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  function startWatch() {
    try {
      Geolocation.requestAuthorization(
        () => {},
        error => {
          console.log('Error while requesting', error);
        },
      );

      const watchID = Geolocation.watchPosition(
        async position => {
          console.log('Watch Position updated.');
          await postTrackingPosition(position);
        },
        error => console.log('watchPosition Error', error),
      );
      setSubscriptionId(watchID);
    } catch (error) {
      console.log('startWatch', error);
    }
  }

  function stopWatch() {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
  }

  return (
    <View>
      <View style={{marginBottom: 8}}>
        {subscriptionId !== null ? (
          <Button title="Stop Watching" onPress={stopWatch} />
        ) : (
          <Button title="Start Watching" onPress={startWatch} />
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
