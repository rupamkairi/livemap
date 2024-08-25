import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {Alert, Button, View} from 'react-native';

export default function WatchLocation() {
  const watchPosition = () => {
    try {
      const watchID = Geolocation.watchPosition(
        position => {
          console.log('watchPosition', position);
        },
        error => Alert.alert('WatchPosition Error', JSON.stringify(error)),
      );
      setSubscriptionId(watchID);
    } catch (error) {
      Alert.alert('WatchPosition Error', JSON.stringify(error));
    }
  };

  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
  };

  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  useEffect(() => {
    // const t = setTimeout(() => {
    //   // This log does not work while app is in background
    //   watchPosition();
    // }, 1000 * 10);
    // console.log('watch timeout', t);

    return () => {
      clearWatch();
      // clearTimeout(t);
    };
  }, []);

  return (
    <View>
      <View>
        {subscriptionId !== null ? (
          <Button title="Clear Watch" onPress={clearWatch} />
        ) : (
          <Button title="Watch Position" onPress={watchPosition} />
        )}
      </View>
    </View>
  );
}
