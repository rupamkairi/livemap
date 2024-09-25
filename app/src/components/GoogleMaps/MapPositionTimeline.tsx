import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
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
              rotation={pos.heading}
              coordinate={{latitude: pos.latitude, longitude: pos.longitude}}>
              <Image
                source={require('./direction_marker.png')}
                style={{height: 8, width: 8}}
              />
            </Marker>
          ))}
          {positions && (
            <Polyline
              coordinates={positions}
              strokeWidth={2}
              strokeColor={'rgba(255,0,0,0.5)'}
            />
          )}
        </MapView>
      </View>
    </View>
  );
}
