import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {useEffect} from 'react';
import {Text, View} from 'react-native';

export default function LibExpoTask() {
  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      TaskManager.defineTask('WATCH_BG_GEO', ({data: {locations}, error}) => {
        if (error) return;
        const newCoords = {
          lat: locations[0].coords.latitude,
          lon: locations[0].coords.longitude,
        };
      });

      Location.startLocationUpdatesAsync('WATCH_BG_GEO', {
        accuracy: Location.Accuracy.BestForNavigation,
        showsBackgroundLocationIndicator: true,
        timeInterval: 1000,
        activityType: Location.ActivityType.AutomotiveNavigation,
        distanceInterval: 1,
        foregroundService: {
          notificationTitle: 'GPS',
          notificationBody: ' enabled',
        },
      });
    })();
  }, []);

  return (
    <View>
      <Text>Expo Tasks</Text>
    </View>
  );
}
