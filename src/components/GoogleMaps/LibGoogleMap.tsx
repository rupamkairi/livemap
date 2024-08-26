import React, {useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import useCurrentLocation from './useCurrentLocation';
import {calculatePointInsidePolygon} from './useCalculatePolygon';

export const emulatorPolygon = [
  {
    latitude: 37.423012,
    longitude: -122.081363,
  },
  {
    latitude: 37.422137,
    longitude: -122.082783,
  },
  {
    latitude: 37.421804,
    longitude: -122.085042,
  },
  {
    latitude: 37.423302,
    longitude: -122.086631,
  },
  {
    latitude: 37.421155,
    longitude: -122.086502,
  },
  {
    latitude: 37.420865,
    longitude: -122.081406,
  },
];

export default function LibGoogleMap() {
  const {latitude: curLat, longitude: curLong} = useCurrentLocation();

  useEffect(() => {
    if (!curLat || !curLong) return;

    console.log(
      calculatePointInsidePolygon(
        {latitude: curLat, longitude: curLong},
        emulatorPolygon,
      ),
    );
  }, [curLat, curLong]);

  if (!curLat || !curLong) return null;

  return (
    <View style={{borderColor: 'red', borderWidth: 1, height: 400}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: curLat,
          longitude: curLong,
          latitudeDelta: 0.0125,
          longitudeDelta: 0.0125,
        }}>
        <Marker coordinate={{latitude: curLat, longitude: curLong}} />
        <Polygon
          coordinates={emulatorPolygon}
          strokeColor="red"
          strokeWidth={1}
          fillColor={'rgba(255,0,0,0.125)'}
          zIndex={2}
        />
      </MapView>
    </View>
  );
}
