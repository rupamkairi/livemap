import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
  skipPermissionRequests: true,
  enableBackgroundLocationUpdates: true,
});

export default function CurrentLocation() {
  let [coordinates, setCoordinates] = useState('');

  useEffect(() => {
    Geolocation.requestAuthorization(
      () => {
        console.log('Successful request.');
      },
      error => {
        console.log('Error while requesting', error);
      },
    );

    Geolocation.getCurrentPosition(
      position => {
        console.log('getCurrentPosition', position);
        setCoordinates(
          `          Latitude: ${position.coords.latitude}, Longitude: ${
            position.coords.longitude
          } 
          Accuracy: ${position.coords.accuracy} 
          At: ${new Date(position.timestamp).toUTCString()}`,
        );
        // console.log(coords.current);
      },
      error => {
        console.log('getCurrentPosition error', error);
      },
    );
  });

  return (
    <View>
      <Text style={{fontSize: 16}}>Current Location coordinates</Text>
      <Text style={{fontWeight: '500'}}>{coordinates}</Text>
    </View>
  );
}
