import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';

export default function useCurrentLocation() {
  const [currentCoordinates, setCurrentCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return {...currentCoordinates};
}
