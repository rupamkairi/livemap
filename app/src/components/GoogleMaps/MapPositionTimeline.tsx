import React, {useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import useCurrentLocation from './useCurrentLocation';

export default function MapPositionTimeline({positions}: any) {
  const {latitude: curLat, longitude: curLong} = useCurrentLocation();

  useEffect(() => {
    if (!curLat || !curLong) return;
  }, [curLat, curLong]);

  if (!curLat || !curLong) return null;

  return (
    <View>
      <View style={{minHeight: 480}}>
        <MapView
          style={{flex: 1}}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: curLat,
            longitude: curLong,
            latitudeDelta: 0.0125,
            longitudeDelta: 0.0125,
          }}>
          {positions?.map((pos, key) => (
            <Marker
              key={key}
              coordinate={{latitude: pos.latitude, longitude: pos.longitude}}
            />
          ))}
          {positions && (
            <Polyline coordinates={positions} strokeColor={'rgba(255,0,0,1)'} />
          )}
        </MapView>
      </View>
    </View>
  );
}
