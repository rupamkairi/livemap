import React, {useState} from 'react';
import useCurrentLocation from './useCurrentLocation';
import {useEffect} from 'react';
import MapView, {Marker, Polygon} from 'react-native-maps';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

export default function MapPolygonEditor({
  polygon: propPolygon,
  onConfirm,
}: any) {
  const [polygon, setPolygon] =
    useState<{latitude: number; longitude: number}[]>();

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
          }}
          onPress={event => {
            console.log(event.nativeEvent);
            if (!polygon) setPolygon([event.nativeEvent.coordinate]);
            else setPolygon([...polygon, event.nativeEvent.coordinate]);
          }}>
          <Marker coordinate={{latitude: curLat, longitude: curLong}} />
          {polygon && <Polygon zIndex={1} coordinates={polygon} />}
          {propPolygon && (
            <Polygon
              zIndex={2}
              strokeColor={'rgba(0,255,0,1)'}
              fillColor={'rgba(0,255,0,0.125)'}
              coordinates={propPolygon}
            />
          )}
        </MapView>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button
          style={{flex: 1}}
          onPress={() => {
            setPolygon([]);
          }}>
          Clear Fence
        </Button>
        <Button
          style={{flex: 1}}
          onPress={() => {
            onConfirm(polygon);
          }}>
          Confirm Fence
        </Button>
      </View>
    </View>
  );
}
