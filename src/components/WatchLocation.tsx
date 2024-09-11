import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {Button, View} from 'react-native';

Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
  skipPermissionRequests: true,
  enableBackgroundLocationUpdates: true,
});

export default function WatchLocation() {
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  const watchPosition = () => {
    try {
      Geolocation.requestAuthorization(
        () => {
          console.log('Successful request.');
        },
        error => {
          console.log('Error while requesting', error);
        },
      );

      const watchID = Geolocation.watchPosition(
        position => {
          console.log('watchPosition', position);
        },
        error => console.log('WatchPosition Error', error),
      );
      setSubscriptionId(watchID);
    } catch (error) {
      console.log('WatchPosition Error', error);
    }
  };

  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
  };

  // useEffect(() => {
  //   return () => {
  //     clearWatch();
  //   };
  // }, []);

  return (
    <View>
      <View>
        {subscriptionId !== null ? (
          <Button
            title={`Clear Watch ${subscriptionId}`}
            onPress={clearWatch}
          />
        ) : (
          <Button title="Watch Position" onPress={watchPosition} />
        )}
      </View>
    </View>
  );
}
